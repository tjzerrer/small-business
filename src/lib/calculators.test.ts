import { describe, expect, it } from "vitest";

import {
  calculateBreakEven,
  calculateCpm,
  calculateMargin,
  calculateMarkup,
  calculateNpv,
  calculateProfit
} from "./calculators";

describe("margin calculator", () => {
  it("calculates gross profit, margin, and markup", () => {
    const result = calculateMargin(100, 60);
    expect(result.rows[0].value).toBe("$40.00");
    expect(result.rows[1].value).toBe("40.00%");
    expect(result.rows[2].value).toBe("66.67%");
  });

  it("throws when revenue is zero", () => {
    expect(() => calculateMargin(0, 10)).toThrow();
  });
});

describe("markup calculator", () => {
  it("calculates selling price, profit, and margin", () => {
    const result = calculateMarkup(50, 40);
    expect(result.rows[0].value).toBe("$70.00");
    expect(result.rows[1].value).toBe("$20.00");
    expect(result.rows[2].value).toBe("28.57%");
  });
});

describe("break-even calculator", () => {
  it("calculates break-even units and revenue", () => {
    const result = calculateBreakEven(5000, 50, 30);
    expect(result.rows[0].value).toBe("$20.00");
    expect(result.rows[1].value).toBe("250");
    expect(result.rows[2].value).toBe("$12,500.00");
  });

  it("throws when contribution margin is zero or negative", () => {
    expect(() => calculateBreakEven(1000, 10, 10)).toThrow();
  });
});

describe("profit calculator", () => {
  it("calculates gross and net profit", () => {
    const result = calculateProfit(10000, 4000, 2500, 500);
    expect(result.rows[0].value).toBe("$6,000.00");
    expect(result.rows[1].value).toBe("$3,000.00");
    expect(result.rows[2].value).toBe("60.00%");
    expect(result.rows[3].value).toBe("30.00%");
  });

  it("handles negative profit", () => {
    const result = calculateProfit(1000, 800, 300, 100);
    expect(result.rows[1].value).toBe("-$200.00");
  });
});

describe("cpm calculator", () => {
  it("calculates cpm", () => {
    const result = calculateCpm(250, 50000);
    expect(result.rows[2].value).toBe("$5.00");
  });

  it("throws when impressions are zero", () => {
    expect(() => calculateCpm(250, 0)).toThrow();
  });
});

describe("npv calculator", () => {
  it("calculates npv from cash flows", () => {
    const result = calculateNpv(10000, 10, [3000, 3500, 4000, 4500, 5000]);
    expect(result.rows[3].value).toBe("$4,803.26");
  });
});
