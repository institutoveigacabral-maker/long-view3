import { describe, it, expect } from "vitest";
import {
  SUBSCRIPTION_PLANS,
  SMQ_DIMENSIONS,
  PRODUCTS_CONFIG,
  DIGITAL_PRODUCTS_CONFIG,
  REGIONS_CONFIG,
  SECTIONS,
  COLORS,
  TESTIMONIALS,
} from "../constants";

describe("SUBSCRIPTION_PLANS", () => {
  it("should have exactly 3 plans: monthly, quarterly, annual", () => {
    const ids = SUBSCRIPTION_PLANS.map((p) => p.id);
    expect(ids).toEqual(["monthly", "quarterly", "annual"]);
  });

  it("should have annual plan cheaper per month than monthly", () => {
    const monthly = SUBSCRIPTION_PLANS.find((p) => p.id === "monthly")!;
    const annual = SUBSCRIPTION_PLANS.find((p) => p.id === "annual")!;
    const annualPerMonth = annual.price / 12;
    expect(annualPerMonth).toBeLessThan(monthly.price);
  });

  it("should have quarterly plan cheaper per month than monthly", () => {
    const monthly = SUBSCRIPTION_PLANS.find((p) => p.id === "monthly")!;
    const quarterly = SUBSCRIPTION_PLANS.find((p) => p.id === "quarterly")!;
    const quarterlyPerMonth = quarterly.price / 3;
    expect(quarterlyPerMonth).toBeLessThan(monthly.price);
  });

  it("each plan should have at least one feature", () => {
    SUBSCRIPTION_PLANS.forEach((plan) => {
      expect(plan.features.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("SMQ_DIMENSIONS", () => {
  it("should have exactly 5 dimensions", () => {
    expect(SMQ_DIMENSIONS).toHaveLength(5);
  });

  it("should have unique ids", () => {
    const ids = SMQ_DIMENSIONS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each dimension should have name, description, and longDescription", () => {
    SMQ_DIMENSIONS.forEach((dim) => {
      expect(dim.name).toBeTruthy();
      expect(dim.description).toBeTruthy();
      expect(dim.longDescription).toBeTruthy();
    });
  });
});

describe("PRODUCTS_CONFIG", () => {
  it("should have prices in ascending order by tier", () => {
    for (let i = 1; i < PRODUCTS_CONFIG.length; i++) {
      expect(PRODUCTS_CONFIG[i].price).toBeGreaterThan(
        PRODUCTS_CONFIG[i - 1].price,
      );
    }
  });

  it("all products should use EUR currency", () => {
    PRODUCTS_CONFIG.forEach((p) => {
      expect(p.currency).toBe("EUR");
    });
  });

  it("should have unique tier numbers", () => {
    const tiers = PRODUCTS_CONFIG.map((p) => p.tier);
    expect(new Set(tiers).size).toBe(tiers.length);
  });
});

describe("DIGITAL_PRODUCTS_CONFIG", () => {
  it("each product should have sections array", () => {
    DIGITAL_PRODUCTS_CONFIG.forEach((p) => {
      expect(Array.isArray(p.sections)).toBe(true);
      expect(p.sections.length).toBeGreaterThan(0);
    });
  });

  it("each product should have trustSignals with format and length", () => {
    DIGITAL_PRODUCTS_CONFIG.forEach((p) => {
      expect(p.trustSignals.format).toBeTruthy();
      expect(p.trustSignals.length).toBeTruthy();
    });
  });
});

describe("REGIONS_CONFIG", () => {
  it("should include Brasil and Portugal", () => {
    const names = REGIONS_CONFIG.map((r) => r.name);
    expect(names).toContain("Portugal");
    expect(names).toContain("Brasil");
  });

  it("should have unique ids", () => {
    const ids = REGIONS_CONFIG.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("SECTIONS", () => {
  it("should have sequential icon numbers", () => {
    SECTIONS.forEach((section, i) => {
      expect(section.icon).toBe(String(i + 1).padStart(2, "0"));
    });
  });
});

describe("COLORS", () => {
  it("should have both light and dark themes", () => {
    expect(COLORS.light).toBeDefined();
    expect(COLORS.dark).toBeDefined();
  });

  it("champagne color should be the same in both themes", () => {
    expect(COLORS.light.champagne).toBe(COLORS.dark.champagne);
  });
});

describe("TESTIMONIALS", () => {
  it("each testimonial should have before, decision, and after fields", () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.before).toBeTruthy();
      expect(t.decision).toBeTruthy();
      expect(t.after).toBeTruthy();
    });
  });
});
