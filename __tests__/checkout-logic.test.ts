import { describe, it, expect } from "vitest";
import { SUBSCRIPTION_PLANS } from "../constants";

// Extracted from CheckoutModal.tsx — pure pricing logic
const EXCHANGE_RATES = { EUR: 1, USD: 1.08, BRL: 5.42 } as const;
type Currency = keyof typeof EXCHANGE_RATES;

function calculatePrice(
  basePrice: number,
  currency: Currency,
  hasAbandonmentOffer: boolean,
): string {
  const finalPrice = hasAbandonmentOffer ? basePrice * 0.8 : basePrice;
  return (finalPrice * EXCHANGE_RATES[currency]).toFixed(2);
}

function getSelectedPlanPrice(
  planId: string,
  isSubscription: boolean,
  productPrice: number,
): number {
  if (isSubscription) {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
    return plan ? plan.price : 0;
  }
  return productPrice;
}

describe("Checkout price calculation", () => {
  it("should return base price in EUR without discount", () => {
    expect(calculatePrice(100, "EUR", false)).toBe("100.00");
  });

  it("should apply 20% abandonment discount", () => {
    expect(calculatePrice(100, "EUR", true)).toBe("80.00");
  });

  it("should convert EUR to USD correctly", () => {
    expect(calculatePrice(100, "USD", false)).toBe("108.00");
  });

  it("should convert EUR to BRL correctly", () => {
    expect(calculatePrice(100, "BRL", false)).toBe("542.00");
  });

  it("should apply discount AND currency conversion together", () => {
    // 100 * 0.8 = 80, 80 * 5.42 = 433.60
    expect(calculatePrice(100, "BRL", true)).toBe("433.60");
  });
});

describe("getSelectedPlanPrice", () => {
  it("should return subscription plan price for subscription products", () => {
    const price = getSelectedPlanPrice("monthly", true, 0);
    expect(price).toBe(99);
  });

  it("should return quarterly plan price", () => {
    const price = getSelectedPlanPrice("quarterly", true, 0);
    expect(price).toBe(267);
  });

  it("should return annual plan price", () => {
    const price = getSelectedPlanPrice("annual", true, 0);
    expect(price).toBe(999);
  });

  it("should return product price for non-subscription items", () => {
    const price = getSelectedPlanPrice("any", false, 47);
    expect(price).toBe(47);
  });

  it("should return 0 for unknown subscription plan", () => {
    const price = getSelectedPlanPrice("unknown", true, 100);
    expect(price).toBe(0);
  });
});
