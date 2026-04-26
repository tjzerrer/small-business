import type { CalculationResult } from "@/lib/types";
import { formatCurrency, formatNumber, formatPercent, roundMoney, roundPercent } from "@/lib/format";

const getPositive = (value: number) => (Number.isFinite(value) ? value : 0);

export function calculateMargin(revenue: number, cost: number): CalculationResult {
  if (revenue <= 0) {
    throw new Error("Please enter a selling price greater than zero.");
  }

  if (cost < 0) {
    throw new Error("Please enter a valid cost.");
  }

  const grossProfit = roundMoney(revenue - cost);
  const marginPercent = roundPercent((grossProfit / revenue) * 100);
  const markupPercent = cost === 0 ? 0 : roundPercent((grossProfit / cost) * 100);

  return {
    sentence: `With revenue of ${formatCurrency(revenue)} and cost of ${formatCurrency(cost)}, gross profit is ${formatCurrency(grossProfit)} and margin is ${formatPercent(marginPercent)}.`,
    rows: [
      { label: "Gross profit", value: formatCurrency(grossProfit) },
      { label: "Margin", value: formatPercent(marginPercent) },
      { label: "Markup", value: cost === 0 ? "Not defined from zero cost" : formatPercent(markupPercent) }
    ],
    note:
      cost === 0
        ? "Markup is not shown as a percentage because cost is zero."
        : "Margin is based on selling price. Markup is based on cost."
  };
}

export function calculateMarkup(cost: number, markupPercent: number): CalculationResult {
  if (cost < 0) {
    throw new Error("Please enter a valid cost.");
  }

  const sellingPrice = roundMoney(cost * (1 + markupPercent / 100));
  const profit = roundMoney(sellingPrice - cost);
  const marginPercent = sellingPrice === 0 ? 0 : roundPercent((profit / sellingPrice) * 100);

  return {
    sentence: `At a cost of ${formatCurrency(cost)} with a markup of ${formatPercent(markupPercent)}, the selling price is ${formatCurrency(sellingPrice)}.`,
    rows: [
      { label: "Selling price", value: formatCurrency(sellingPrice) },
      { label: "Profit", value: formatCurrency(profit) },
      { label: "Resulting margin", value: formatPercent(marginPercent) }
    ],
    note: "Markup is added on top of cost. Margin measures the share of the final selling price kept as profit."
  };
}

export function calculateBreakEven(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): CalculationResult {
  const contributionMargin = roundMoney(pricePerUnit - variableCostPerUnit);

  if (contributionMargin <= 0) {
    throw new Error(
      "Break-even cannot be reached because price per unit must be greater than variable cost per unit."
    );
  }

  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  return {
    sentence: `You need about ${formatNumber(breakEvenUnits)} units in sales to cover ${formatCurrency(fixedCosts)} in fixed costs.`,
    rows: [
      { label: "Contribution margin per unit", value: formatCurrency(contributionMargin) },
      { label: "Break-even units", value: formatNumber(breakEvenUnits) },
      { label: "Break-even revenue", value: formatCurrency(breakEvenRevenue) }
    ],
    note: "If each unit does not contribute profit after variable cost, break-even is impossible."
  };
}

export function calculateProfit(
  revenue: number,
  cogs: number,
  operatingExpenses: number,
  otherExpenses: number
): CalculationResult {
  if (revenue <= 0) {
    throw new Error("Please enter revenue greater than zero.");
  }

  const grossProfit = roundMoney(revenue - cogs);
  const netProfit = roundMoney(revenue - cogs - operatingExpenses - otherExpenses);
  const grossMargin = roundPercent((grossProfit / revenue) * 100);
  const netMargin = roundPercent((netProfit / revenue) * 100);

  return {
    sentence: `From ${formatCurrency(revenue)} in revenue, gross profit is ${formatCurrency(grossProfit)} and net profit is ${formatCurrency(netProfit)}.`,
    rows: [
      { label: "Gross profit", value: formatCurrency(grossProfit) },
      { label: "Net profit", value: formatCurrency(netProfit) },
      { label: "Gross margin", value: formatPercent(grossMargin) },
      { label: "Net margin", value: formatPercent(netMargin) }
    ],
    note: netProfit < 0 ? "Net profit is negative, which means the business is operating at a loss in this scenario." : "Net profit reflects cost of goods sold plus operating and other expenses."
  };
}

export function calculateCpm(adCost: number, impressions: number): CalculationResult {
  if (impressions <= 0) {
    throw new Error("Please enter impressions greater than zero.");
  }

  const cpm = roundMoney((adCost / impressions) * 1000);

  return {
    sentence: `With ad cost of ${formatCurrency(adCost)} over ${formatNumber(impressions)} impressions, CPM is ${formatCurrency(cpm)}.`,
    rows: [
      { label: "Ad cost", value: formatCurrency(adCost) },
      { label: "Impressions", value: formatNumber(impressions) },
      { label: "CPM", value: formatCurrency(cpm) }
    ],
    note: "CPM shows the cost for every 1,000 impressions."
  };
}

export function calculateNpv(
  initialInvestment: number,
  discountRate: number,
  cashFlows: number[]
): CalculationResult {
  const validFlows = cashFlows.map(getPositive);
  const presentValues = validFlows.map((flow, index) => flow / (1 + discountRate / 100) ** (index + 1));
  const totalPresentValue = presentValues.reduce((sum, value) => sum + value, 0);
  const npv = roundMoney(totalPresentValue - initialInvestment);

  return {
    sentence: `At a discount rate of ${formatPercent(discountRate)}, the estimated NPV is ${formatCurrency(npv)}.`,
    rows: [
      { label: "Initial investment", value: formatCurrency(initialInvestment) },
      { label: "Discount rate", value: formatPercent(discountRate) },
      { label: "Present value of cash flows", value: formatCurrency(totalPresentValue) },
      { label: "NPV", value: formatCurrency(npv) }
    ],
    note:
      npv >= 0
        ? "A positive NPV suggests the projected cash flows exceed the discount-adjusted cost of the investment."
        : "A negative NPV suggests the projected cash flows do not cover the discount-adjusted cost of the investment."
  };
}
