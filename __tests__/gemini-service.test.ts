import { describe, it, expect, vi, beforeEach } from "vitest";

// Extracted from geminiService.ts — pure utility function
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function buildCacheKey(
  userMessage: string,
  history: { role: string; text: string }[],
): string {
  return `antony_cache_${simpleHash(userMessage + JSON.stringify(history.slice(-2)))}`;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;

function isCacheValid(timestamp: number, now: number): boolean {
  return now - timestamp < CACHE_DURATION;
}

// Mock-based test for getAntonyResponse behavior
async function getAntonyResponse(
  userMessage: string,
  history: { role: "user" | "model"; text: string }[],
  fetchFn: typeof fetch,
) {
  try {
    const response = await fetchFn("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          "Falha na comunicacao com o servidor de auditoria.",
      );
    }

    const data = await response.json();
    return { text: data.text, riskLevel: data.riskLevel, cached: false };
  } catch (error: any) {
    return {
      text: `**ALERTA DE SISTEMA:** ${error.message || "Falha na sintese cognitiva."}\n\nReinicie o protocolo ou tente mais tarde.`,
      riskLevel: "HIGH",
      cached: false,
    };
  }
}

describe("simpleHash", () => {
  it("should return a deterministic hash for the same input", () => {
    const hash1 = simpleHash("hello");
    const hash2 = simpleHash("hello");
    expect(hash1).toBe(hash2);
  });

  it("should return different hashes for different inputs", () => {
    const hash1 = simpleHash("hello");
    const hash2 = simpleHash("world");
    expect(hash1).not.toBe(hash2);
  });

  it("should return a base-36 string", () => {
    const hash = simpleHash("test");
    expect(hash).toMatch(/^[0-9a-z]+$/);
  });

  it("should handle empty string", () => {
    const hash = simpleHash("");
    expect(hash).toBe("0");
  });
});

describe("buildCacheKey", () => {
  it("should include the prefix antony_cache_", () => {
    const key = buildCacheKey("msg", []);
    expect(key.startsWith("antony_cache_")).toBe(true);
  });

  it("should produce same key for same message and history", () => {
    const history = [{ role: "user", text: "test" }];
    const key1 = buildCacheKey("msg", history);
    const key2 = buildCacheKey("msg", history);
    expect(key1).toBe(key2);
  });

  it("should only use last 2 history entries for cache key", () => {
    const history = [
      { role: "user", text: "old" },
      { role: "model", text: "reply1" },
      { role: "user", text: "recent" },
    ];
    const key1 = buildCacheKey("msg", history);

    const shortHistory = [
      { role: "model", text: "reply1" },
      { role: "user", text: "recent" },
    ];
    const key2 = buildCacheKey("msg", shortHistory);
    expect(key1).toBe(key2);
  });
});

describe("isCacheValid", () => {
  it("should return true for a recent timestamp", () => {
    const now = Date.now();
    expect(isCacheValid(now - 1000, now)).toBe(true);
  });

  it("should return false for a timestamp older than 24h", () => {
    const now = Date.now();
    const oldTimestamp = now - 25 * 60 * 60 * 1000;
    expect(isCacheValid(oldTimestamp, now)).toBe(false);
  });

  it("should return true at exactly 23h59m", () => {
    const now = Date.now();
    const almostExpired = now - (24 * 60 * 60 * 1000 - 60000);
    expect(isCacheValid(almostExpired, now)).toBe(true);
  });
});

describe("getAntonyResponse (mocked API)", () => {
  it("should return parsed response on success", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ text: "Diagnostico completo.", riskLevel: "LOW" }),
    });

    const result = await getAntonyResponse("minha tese", [], mockFetch as any);
    expect(result.text).toBe("Diagnostico completo.");
    expect(result.riskLevel).toBe("LOW");
    expect(result.cached).toBe(false);
  });

  it("should return error message on API failure", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ error: "Limite de requisicoes excedido." }),
    });

    const result = await getAntonyResponse("teste", [], mockFetch as any);
    expect(result.text).toContain("ALERTA DE SISTEMA");
    expect(result.text).toContain("Limite de requisicoes excedido.");
    expect(result.riskLevel).toBe("HIGH");
  });

  it("should return error on network failure", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const result = await getAntonyResponse("teste", [], mockFetch as any);
    expect(result.text).toContain("Network error");
    expect(result.riskLevel).toBe("HIGH");
  });

  it("should send message and history in request body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: "ok", riskLevel: "LOW" }),
    });

    const history = [{ role: "user" as const, text: "hello" }];
    await getAntonyResponse("new msg", history, mockFetch as any);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.message).toBe("new msg");
    expect(body.history).toEqual(history);
  });
});
