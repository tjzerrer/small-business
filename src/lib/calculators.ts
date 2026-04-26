import type { CalculationResult } from "@/lib/types";
import { formatCurrency, formatNumber, formatPercent, roundMoney, roundPercent } from "@/lib/format";

const getFiniteOrZero = (value: number) => (Number.isFinite(value) ? value : 0);

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
    note:
      netProfit < 0
        ? "Net profit is negative, which means the business is operating at a loss in this scenario."
        : "Net profit reflects cost of goods sold plus operating and other expenses."
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
  const validFlows = cashFlows.map(getFiniteOrZero);
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

export function calculateRoi(gainFromInvestment: number, costOfInvestment: number): CalculationResult {
  if (costOfInvestment <= 0) {
    throw new Error("Please enter a cost of investment greater than zero.");
  }

  const netGain = roundMoney(gainFromInvestment - costOfInvestment);
  const roiPercent = roundPercent((netGain / costOfInvestment) * 100);

  return {
    sentence: `With ${formatCurrency(gainFromInvestment)} returned from an investment that cost ${formatCurrency(costOfInvestment)}, net gain is ${formatCurrency(netGain)} and ROI is ${formatPercent(roiPercent)}.`,
    rows: [
      { label: "Net gain", value: formatCurrency(netGain) },
      { label: "ROI", value: formatPercent(roiPercent) }
    ],
    note:
      roiPercent < 0
        ? "This investment lost money relative to what it cost."
        : "This investment gained money relative to what it cost."
  };
}

export function calculatePricing(
  cost: number,
  targetPercent: number,
  pricingMode: "markup" | "margin"
): CalculationResult {
  if (cost < 0) {
    throw new Error("Please enter a valid cost.");
  }

  if (pricingMode === "margin" && targetPercent >= 100) {
    throw new Error("Target margin must be less than 100%.");
  }

  const sellingPrice =
    pricingMode === "markup"
      ? roundMoney(cost * (1 + targetPercent / 100))
      : roundMoney(cost / (1 - targetPercent / 100));

  const profitPerSale = roundMoney(sellingPrice - cost);
  const resultingMargin = sellingPrice === 0 ? 0 : roundPercent((profitPerSale / sellingPrice) * 100);
  const resultingMarkup = cost === 0 ? 0 : roundPercent((profitPerSale / cost) * 100);

  return {
    sentence:
      pricingMode === "markup"
        ? `At a cost of ${formatCurrency(cost)} and a target markup of ${formatPercent(targetPercent)}, the suggested selling price is ${formatCurrency(sellingPrice)}.`
        : `At a cost of ${formatCurrency(cost)} and a target margin of ${formatPercent(targetPercent)}, the suggested selling price is ${formatCurrency(sellingPrice)}.`,
    rows: [
      { label: "Suggested selling price", value: formatCurrency(sellingPrice) },
      { label: "Profit per sale", value: formatCurrency(profitPerSale) },
      { label: "Resulting margin", value: formatPercent(resultingMargin) },
      {
        label: "Resulting markup",
        value: cost === 0 ? "Not defined from zero cost" : formatPercent(resultingMarkup)
      }
    ],
    note:
      pricingMode === "markup"
        ? "Markup mode adds the target percentage on top of cost."
        : "Margin mode solves for the price that keeps the target share of the sale as profit."
  };
}

export function calculateContributionMargin(
  sellingPricePerUnit: number,
  variableCostPerUnit: number,
  fixedCosts?: number
): CalculationResult {
  if (sellingPricePerUnit <= 0) {
    throw new Error("Please enter a selling price per unit greater than zero.");
  }

  const contributionMarginPerUnit = roundMoney(sellingPricePerUnit - variableCostPerUnit);
  if (contributionMarginPerUnit <= 0) {
    throw new Error("Each sale must contribute positive margin after variable cost.");
  }

  const contributionMarginRatio = roundPercent((contributionMarginPerUnit / sellingPricePerUnit) * 100);
  const normalizedFixedCosts = Number.isFinite(fixedCosts) ? fixedCosts ?? 0 : 0;
  const hasFixedCosts = Number.isFinite(fixedCosts) && normalizedFixedCosts > 0;
  const breakEvenUnits = hasFixedCosts ? normalizedFixedCosts / contributionMarginPerUnit : null;

  return {
    sentence: hasFixedCosts
      ? `Each sale contributes ${formatCurrency(contributionMarginPerUnit)} toward fixed costs and profit, and break-even is about ${formatNumber(breakEvenUnits ?? 0)} units.`
      : `Each sale contributes ${formatCurrency(contributionMarginPerUnit)} toward fixed costs and profit, and the contribution margin ratio is ${formatPercent(contributionMarginRatio)}.`,
    rows: [
      { label: "Contribution margin per unit", value: formatCurrency(contributionMarginPerUnit) },
      { label: "Contribution margin ratio", value: formatPercent(contributionMarginRatio) },
      ...(hasFixedCosts && breakEvenUnits !== null
        ? [{ label: "Break-even units", value: formatNumber(breakEvenUnits) }]
        : [])
    ],
    note:
      hasFixedCosts && breakEvenUnits !== null
        ? "Break-even units are shown because fixed costs were included."
        : "Contribution margin shows what each sale leaves to cover fixed costs and profit."
  };
}

export function calculateCustomerAcquisitionCost(
  marketingSpend: number,
  newCustomers: number
): CalculationResult {
  if (newCustomers <= 0) {
    throw new Error("Please enter new customers acquired greater than zero.");
  }

  const cac = roundMoney(marketingSpend / newCustomers);

  return {
    sentence: `With ${formatCurrency(marketingSpend)} in spend and ${formatNumber(newCustomers)} new customers acquired, customer acquisition cost is ${formatCurrency(cac)}.`,
    rows: [
      { label: "Marketing / sales spend", value: formatCurrency(marketingSpend) },
      { label: "New customers", value: formatNumber(newCustomers) },
      { label: "Customer acquisition cost", value: formatCurrency(cac) }
    ],
    note: "CAC shows the average cost to acquire one new customer in the period you entered."
  };
}

export function calculateLifetimeValue(
  averageRevenuePerCustomer: number,
  grossMarginPercent: number,
  customerLifespanMonths: number
): CalculationResult {
  if (grossMarginPercent < 0 || grossMarginPercent > 100) {
    throw new Error("Gross margin should stay between 0% and 100%.");
  }

  if (customerLifespanMonths <= 0) {
    throw new Error("Please enter a customer lifespan greater than zero.");
  }

  const lifetimeValue = roundMoney(
    averageRevenuePerCustomer * (grossMarginPercent / 100) * customerLifespanMonths
  );

  return {
    sentence: `With average revenue of ${formatCurrency(averageRevenuePerCustomer)}, gross margin of ${formatPercent(grossMarginPercent)}, and lifespan of ${formatNumber(customerLifespanMonths)} months, estimated lifetime value is ${formatCurrency(lifetimeValue)}.`,
    rows: [
      { label: "Average revenue per customer", value: formatCurrency(averageRevenuePerCustomer) },
      { label: "Gross margin", value: formatPercent(grossMarginPercent) },
      { label: "Customer lifespan", value: `${formatNumber(customerLifespanMonths)} months` },
      { label: "Estimated lifetime value", value: formatCurrency(lifetimeValue) }
    ],
    note: "This is a simple gross-profit-based estimate of customer value over time."
  };
}

export function calculateDiscount(originalPrice: number, discountPercent: number): CalculationResult {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount percentage should stay between 0% and 100%.");
  }

  const discountAmount = roundMoney((originalPrice * discountPercent) / 100);
  const salePrice = roundMoney(originalPrice - discountAmount);

  return {
    sentence: `From an original price of ${formatCurrency(originalPrice)} and a discount of ${formatPercent(discountPercent)}, the sale price is ${formatCurrency(salePrice)}.`,
    rows: [
      { label: "Discount amount", value: formatCurrency(discountAmount) },
      { label: "Sale price", value: formatCurrency(salePrice) },
      { label: "Savings percentage", value: formatPercent(discountPercent) }
    ],
    note: "Discount amount shows the money removed from the original price before the sale price is set."
  };
}
