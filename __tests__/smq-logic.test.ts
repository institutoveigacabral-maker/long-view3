import { describe, it, expect } from "vitest";
import { SMQ_DIMENSIONS } from "../constants";

// Extracted from SMQAssessment.tsx — pure logic functions
function getLevel(score: number) {
  if (score >= 90)
    return {
      label: "Arquiteto Quantico",
      desc: "Dominio total da realidade e expansao.",
    };
  if (score >= 70)
    return {
      label: "Operador Avancado",
      desc: "Padroes consistentes, em fase de escala.",
    };
  if (score >= 50)
    return {
      label: "Observador Ativo",
      desc: "Consciencia presente, mas execucao oscilante.",
    };
  return {
    label: "Reativo",
    desc: "A realidade ainda domina o observador.",
  };
}

function calculateTotalScore(scores: Record<string, number>): number {
  return (Object.values(scores) as number[]).reduce((a, b) => a + b, 0);
}

function computeRadarPoints(scores: Record<string, number>) {
  const angleStep = (Math.PI * 2) / SMQ_DIMENSIONS.length;
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;

  return SMQ_DIMENSIONS.map((dim, i) => {
    const score = scores[dim.id] || 0;
    const radius = (score / 20) * maxRadius;
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
}

describe("SMQ getLevel classification", () => {
  it("should return Reativo for scores below 50", () => {
    expect(getLevel(0).label).toBe("Reativo");
    expect(getLevel(49).label).toBe("Reativo");
  });

  it("should return Observador Ativo for scores 50-69", () => {
    expect(getLevel(50).label).toBe("Observador Ativo");
    expect(getLevel(69).label).toBe("Observador Ativo");
  });

  it("should return Operador Avancado for scores 70-89", () => {
    expect(getLevel(70).label).toBe("Operador Avancado");
    expect(getLevel(89).label).toBe("Operador Avancado");
  });

  it("should return Arquiteto Quantico for scores 90+", () => {
    expect(getLevel(90).label).toBe("Arquiteto Quantico");
    expect(getLevel(100).label).toBe("Arquiteto Quantico");
  });
});

describe("calculateTotalScore", () => {
  it("should sum all dimension scores", () => {
    const scores = {
      observer: 10,
      direction: 10,
      competence: 10,
      sacrifice: 10,
      expansion: 10,
    };
    expect(calculateTotalScore(scores)).toBe(50);
  });

  it("should return 0 for all zeros", () => {
    const scores = {
      observer: 0,
      direction: 0,
      competence: 0,
      sacrifice: 0,
      expansion: 0,
    };
    expect(calculateTotalScore(scores)).toBe(0);
  });

  it("should return 100 for all maxed out", () => {
    const scores = {
      observer: 20,
      direction: 20,
      competence: 20,
      sacrifice: 20,
      expansion: 20,
    };
    expect(calculateTotalScore(scores)).toBe(100);
  });
});

describe("computeRadarPoints", () => {
  it("should return 5 points (one per dimension)", () => {
    const scores = {
      observer: 10,
      direction: 10,
      competence: 10,
      sacrifice: 10,
      expansion: 10,
    };
    const points = computeRadarPoints(scores);
    expect(points).toHaveLength(5);
  });

  it("all zero scores should place points at center", () => {
    const scores = {
      observer: 0,
      direction: 0,
      competence: 0,
      sacrifice: 0,
      expansion: 0,
    };
    const points = computeRadarPoints(scores);
    points.forEach((p) => {
      expect(p.x).toBeCloseTo(150, 5);
      expect(p.y).toBeCloseTo(150, 5);
    });
  });

  it("max score on first dimension should point upward (y < center)", () => {
    const scores = {
      observer: 20,
      direction: 0,
      competence: 0,
      sacrifice: 0,
      expansion: 0,
    };
    const points = computeRadarPoints(scores);
    // First point angle is -PI/2 (straight up), so y should be 150 - 100 = 50
    expect(points[0].y).toBeCloseTo(50, 5);
    expect(points[0].x).toBeCloseTo(150, 5);
  });
});
