import { describe, expect, it } from "vitest";

import {
  calculateBreakEven,
  calculateContributionMargin,
  calculateCpm,
  calculateCustomerAcquisitionCost,
  calculateDiscount,
  calculateLifetimeValue,
  calculateMargin,
  calculateMarkup,
  calculateNpv,
  calculatePricing,
  calculateProfit,
  calculateRoi
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

describe("roi calculator", () => {
  it("calculates net gain and roi", () => {
    const result = calculateRoi(15000, 10000);
    expect(result.rows[0].value).toBe("$5,000.00");
    expect(result.rows[1].value).toBe("50.00%");
  });

  it("handles negative roi", () => {
    const result = calculateRoi(8000, 10000);
    expect(result.rows[1].value).toBe("-20.00%");
  });
});

describe("pricing calculator", () => {
  it("calculates selling price from markup", () => {
    const result = calculatePricing(50, 40, "markup");
    expect(result.rows[0].value).toBe("$70.00");
    expect(result.rows[1].value).toBe("$20.00");
    expect(result.rows[2].value).toBe("28.57%");
  });

  it("calculates selling price from target margin", () => {
    const result = calculatePricing(50, 40, "margin");
    expect(result.rows[0].value).toBe("$83.33");
    expect(result.rows[1].value).toBe("$33.33");
    expect(result.rows[3].value).toBe("66.66%");
  });

  it("throws when target margin is 100 percent or more", () => {
    expect(() => calculatePricing(50, 100, "margin")).toThrow();
  });
});

describe("contribution margin calculator", () => {
  it("calculates contribution margin and ratio", () => {
    const result = calculateContributionMargin(50, 30);
    expect(result.rows[0].value).toBe("$20.00");
    expect(result.rows[1].value).toBe("40.00%");
  });

  it("calculates optional break-even units", () => {
    const result = calculateContributionMargin(50, 30, 5000);
    expect(result.rows[2].value).toBe("250");
  });

  it("throws when contribution is zero or negative", () => {
    expect(() => calculateContributionMargin(30, 30)).toThrow();
  });
});

describe("customer acquisition cost calculator", () => {
  it("calculates cac", () => {
    const result = calculateCustomerAcquisitionCost(5000, 50);
    expect(result.rows[2].value).toBe("$100.00");
  });

  it("throws when new customers is zero", () => {
    expect(() => calculateCustomerAcquisitionCost(5000, 0)).toThrow();
  });
});

describe("lifetime value calculator", () => {
  it("calculates ltv", () => {
    const result = calculateLifetimeValue(150, 70, 12);
    expect(result.rows[3].value).toBe("$1,260.00");
  });

  it("throws when lifespan is zero", () => {
    expect(() => calculateLifetimeValue(150, 70, 0)).toThrow();
  });
});

describe("discount calculator", () => {
  it("calculates discount amount and sale price", () => {
    const result = calculateDiscount(120, 25);
    expect(result.rows[0].value).toBe("$30.00");
    expect(result.rows[1].value).toBe("$90.00");
    expect(result.rows[2].value).toBe("25.00%");
  });

  it("throws when discount percentage is above 100", () => {
    expect(() => calculateDiscount(120, 101)).toThrow();
  });
});
