import { describe, it, expect } from "vitest";

// Extracted from analytics.ts — pure logic
function trackTimeConversion(durationInMs: number): number {
  return Math.floor(durationInMs / 1000);
}

describe("Analytics time conversion", () => {
  it("should convert milliseconds to seconds (floor)", () => {
    expect(trackTimeConversion(1500)).toBe(1);
    expect(trackTimeConversion(2999)).toBe(2);
    expect(trackTimeConversion(0)).toBe(0);
  });

  it("should handle exact second boundaries", () => {
    expect(trackTimeConversion(1000)).toBe(1);
    expect(trackTimeConversion(60000)).toBe(60);
  });
});
