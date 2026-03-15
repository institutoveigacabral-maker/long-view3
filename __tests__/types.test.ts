import { describe, it, expect } from "vitest";
import { Region } from "../types";

describe("Region enum", () => {
  it("should have 7 regions", () => {
    const values = Object.values(Region);
    expect(values).toHaveLength(7);
  });

  it("should include all expected regions", () => {
    expect(Region.PORTUGAL).toBe("Portugal");
    expect(Region.LATAM).toBe("LatAm");
    expect(Region.IBERIA).toBe("Iberia");
    expect(Region.USA).toBe("USA");
    expect(Region.GULF).toBe("Gulf");
    expect(Region.CHINA).toBe("China");
    expect(Region.BRASIL).toBe("Brasil");
  });
});
