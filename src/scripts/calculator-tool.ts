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
} from "@/lib/calculators";
import type { CalculationResult } from "@/lib/types";

const getInput = (form: HTMLFormElement, name: string) => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLSelectElement ? field : null;
};

const getNumber = (formData: FormData, name: string) => {
  const raw = formData.get(name);
  if (raw === null || raw === "") {
    return Number.NaN;
  }
  return Number(raw);
};

const setFieldError = (form: HTMLFormElement, name: string, message: string) => {
  const field = getInput(form, name);
  const error = form.querySelector<HTMLElement>(`[data-field-error="${name}"]`);

  if (field) {
    field.setAttribute("aria-invalid", "true");
  }

  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
};

const clearErrors = (form: HTMLFormElement) => {
  form.querySelectorAll<HTMLElement>("[data-field-error]").forEach((node) => {
    node.hidden = true;
    node.textContent = "";
  });

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[aria-invalid='true']").forEach((node) => {
    node.removeAttribute("aria-invalid");
  });
};

const validateRequired = (form: HTMLFormElement, name: string, message: string) => {
  const field = getInput(form, name);
  if (!field || field.value === "") {
    setFieldError(form, name, message);
    return false;
  }
  return true;
};

const stopForMissingFields = (checks: boolean[]) => {
  if (checks.includes(false)) {
    throw new Error("Please complete the required fields.");
  }
};

const calculators: Record<string, (form: HTMLFormElement, formData: FormData) => CalculationResult> = {
  "margin-calculator": (form, formData) => {
    const revenueOkay = validateRequired(form, "revenue", "Please enter your revenue.");
    const costOkay = validateRequired(form, "cost", "Please enter your cost.");
    stopForMissingFields([revenueOkay, costOkay]);

    const revenue = getNumber(formData, "revenue");
    const cost = getNumber(formData, "cost");

    if (revenue === 0) {
      setFieldError(form, "revenue", "Please enter a selling price greater than zero.");
      throw new Error("Margin cannot be calculated from zero revenue.");
    }

    return calculateMargin(revenue, cost);
  },
  "markup-calculator": (form, formData) => {
    const costOkay = validateRequired(form, "cost", "Please enter your cost.");
    const markupOkay = validateRequired(form, "markupPercent", "Please enter a markup percentage.");
    stopForMissingFields([costOkay, markupOkay]);

    return calculateMarkup(getNumber(formData, "cost"), getNumber(formData, "markupPercent"));
  },
  "break-even-calculator": (form, formData) => {
    const fixedCostsOkay = validateRequired(form, "fixedCosts", "Please enter fixed costs.");
    const priceOkay = validateRequired(form, "pricePerUnit", "Please enter a price per unit.");
    const variableOkay = validateRequired(
      form,
      "variableCostPerUnit",
      "Please enter a variable cost per unit."
    );
    stopForMissingFields([fixedCostsOkay, priceOkay, variableOkay]);

    const fixedCosts = getNumber(formData, "fixedCosts");
    const pricePerUnit = getNumber(formData, "pricePerUnit");
    const variableCostPerUnit = getNumber(formData, "variableCostPerUnit");

    if (pricePerUnit <= variableCostPerUnit) {
      setFieldError(form, "pricePerUnit", "Price per unit must be greater than variable cost per unit.");
      setFieldError(
        form,
        "variableCostPerUnit",
        "Break-even cannot be reached when each unit adds no positive contribution."
      );
      throw new Error(
        "Break-even cannot be reached because price per unit is less than or equal to variable cost per unit."
      );
    }

    return calculateBreakEven(fixedCosts, pricePerUnit, variableCostPerUnit);
  },
  "profit-calculator": (form, formData) => {
    const revenueOkay = validateRequired(form, "revenue", "Please enter your revenue.");
    const cogsOkay = validateRequired(form, "cogs", "Please enter cost of goods sold.");
    const operatingOkay = validateRequired(form, "operatingExpenses", "Please enter operating expenses.");
    stopForMissingFields([revenueOkay, cogsOkay, operatingOkay]);

    return calculateProfit(
      getNumber(formData, "revenue"),
      getNumber(formData, "cogs"),
      getNumber(formData, "operatingExpenses"),
      Number.isNaN(getNumber(formData, "otherExpenses")) ? 0 : getNumber(formData, "otherExpenses")
    );
  },
  "cpm-calculator": (form, formData) => {
    const adCostOkay = validateRequired(form, "adCost", "Please enter ad cost.");
    const impressionsOkay = validateRequired(form, "impressions", "Please enter impressions.");
    stopForMissingFields([adCostOkay, impressionsOkay]);

    const impressions = getNumber(formData, "impressions");
    if (impressions === 0) {
      setFieldError(form, "impressions", "Please enter impressions greater than zero.");
      throw new Error("CPM cannot be calculated with zero impressions.");
    }

    return calculateCpm(getNumber(formData, "adCost"), impressions);
  },
  "npv-calculator": (form, formData) => {
    const initialOkay = validateRequired(form, "initialInvestment", "Please enter the initial investment.");
    const discountOkay = validateRequired(form, "discountRate", "Please enter the discount rate.");
    const cashFlows = ["cashFlow1", "cashFlow2", "cashFlow3", "cashFlow4", "cashFlow5"].map((name) =>
      getNumber(formData, name)
    );
    const hasAtLeastOneCashFlow = cashFlows.some((value) => Number.isFinite(value) && value !== 0);

    if (!hasAtLeastOneCashFlow) {
      setFieldError(form, "cashFlow1", "Please enter at least one yearly cash flow.");
    }

    stopForMissingFields([initialOkay, discountOkay, hasAtLeastOneCashFlow]);

    return calculateNpv(
      getNumber(formData, "initialInvestment"),
      getNumber(formData, "discountRate"),
      cashFlows.map((value) => (Number.isFinite(value) ? value : 0))
    );
  },
  "roi-calculator": (form, formData) => {
    const gainOkay = validateRequired(form, "gainFromInvestment", "Please enter gain from investment.");
    const costOkay = validateRequired(form, "costOfInvestment", "Please enter cost of investment.");
    stopForMissingFields([gainOkay, costOkay]);

    const costOfInvestment = getNumber(formData, "costOfInvestment");
    if (costOfInvestment === 0) {
      setFieldError(form, "costOfInvestment", "Please enter a cost greater than zero.");
      throw new Error("ROI cannot be calculated when cost of investment is zero.");
    }

    return calculateRoi(getNumber(formData, "gainFromInvestment"), costOfInvestment);
  },
  "pricing-calculator": (form, formData) => {
    const costOkay = validateRequired(form, "cost", "Please enter your cost.");
    const percentOkay = validateRequired(form, "targetPercent", "Please enter your target percentage.");
    stopForMissingFields([costOkay, percentOkay]);

    const pricingMode = (formData.get("pricingMode")?.toString() ?? "markup") as "markup" | "margin";
    const targetPercent = getNumber(formData, "targetPercent");

    if (pricingMode === "margin" && targetPercent >= 100) {
      setFieldError(form, "targetPercent", "Target margin must stay below 100%.");
      throw new Error("Target margin must be less than 100%.");
    }

    return calculatePricing(getNumber(formData, "cost"), targetPercent, pricingMode);
  },
  "contribution-margin-calculator": (form, formData) => {
    const priceOkay = validateRequired(form, "sellingPricePerUnit", "Please enter your selling price per unit.");
    const variableOkay = validateRequired(
      form,
      "variableCostPerUnit",
      "Please enter your variable cost per unit."
    );
    stopForMissingFields([priceOkay, variableOkay]);

    const sellingPricePerUnit = getNumber(formData, "sellingPricePerUnit");
    const variableCostPerUnit = getNumber(formData, "variableCostPerUnit");
    const fixedCosts = getNumber(formData, "fixedCosts");

    if (sellingPricePerUnit === 0) {
      setFieldError(form, "sellingPricePerUnit", "Please enter a selling price greater than zero.");
      throw new Error("Contribution margin ratio cannot be calculated from zero selling price.");
    }

    if (sellingPricePerUnit <= variableCostPerUnit) {
      setFieldError(
        form,
        "sellingPricePerUnit",
        "Selling price must be greater than variable cost to create contribution margin."
      );
      setFieldError(
        form,
        "variableCostPerUnit",
        "Each sale needs positive contribution after variable cost."
      );
      throw new Error("Each sale does not contribute positive margin after variable cost.");
    }

    return calculateContributionMargin(
      sellingPricePerUnit,
      variableCostPerUnit,
      Number.isNaN(fixedCosts) ? undefined : fixedCosts
    );
  },
  "customer-acquisition-cost-calculator": (form, formData) => {
    const spendOkay = validateRequired(form, "marketingSpend", "Please enter your marketing or sales spend.");
    const customersOkay = validateRequired(form, "newCustomers", "Please enter new customers acquired.");
    stopForMissingFields([spendOkay, customersOkay]);

    const newCustomers = getNumber(formData, "newCustomers");
    if (newCustomers === 0) {
      setFieldError(form, "newCustomers", "Please enter new customers greater than zero.");
      throw new Error("Customer acquisition cost cannot be calculated with zero new customers.");
    }

    return calculateCustomerAcquisitionCost(getNumber(formData, "marketingSpend"), newCustomers);
  },
  "lifetime-value-calculator": (form, formData) => {
    const revenueOkay = validateRequired(
      form,
      "averageRevenuePerCustomer",
      "Please enter average revenue per customer."
    );
    const marginOkay = validateRequired(form, "grossMarginPercent", "Please enter gross margin percentage.");
    const lifespanOkay = validateRequired(form, "customerLifespanMonths", "Please enter customer lifespan.");
    stopForMissingFields([revenueOkay, marginOkay, lifespanOkay]);

    const grossMarginPercent = getNumber(formData, "grossMarginPercent");
    const customerLifespanMonths = getNumber(formData, "customerLifespanMonths");

    if (grossMarginPercent < 0 || grossMarginPercent > 100) {
      setFieldError(form, "grossMarginPercent", "Gross margin should stay between 0% and 100%.");
      throw new Error("Gross margin should stay between 0% and 100%.");
    }

    if (customerLifespanMonths <= 0) {
      setFieldError(form, "customerLifespanMonths", "Please enter a lifespan greater than zero.");
      throw new Error("Customer lifespan must be greater than zero.");
    }

    return calculateLifetimeValue(
      getNumber(formData, "averageRevenuePerCustomer"),
      grossMarginPercent,
      customerLifespanMonths
    );
  },
  "discount-calculator": (form, formData) => {
    const priceOkay = validateRequired(form, "originalPrice", "Please enter the original price.");
    const discountOkay = validateRequired(form, "discountPercent", "Please enter the discount percentage.");
    stopForMissingFields([priceOkay, discountOkay]);

    const discountPercent = getNumber(formData, "discountPercent");
    if (discountPercent < 0 || discountPercent > 100) {
      setFieldError(form, "discountPercent", "Discount percentage should stay between 0% and 100%.");
      throw new Error("Discount percentage should stay between 0% and 100%.");
    }

    return calculateDiscount(getNumber(formData, "originalPrice"), discountPercent);
  }
};

document.querySelectorAll<HTMLElement>("[data-calculator-root]").forEach((root) => {
  const form = root.querySelector<HTMLFormElement>("[data-calculator-form]");
  const tool = root.dataset.tool;
  const resultContent = root.querySelector<HTMLElement>("[data-result-content]");
  const resultSentence = root.querySelector<HTMLElement>("[data-result-sentence]");
  const resultBreakdown = root.querySelector<HTMLElement>("[data-result-breakdown]");
  const summaryNote = root.querySelector<HTMLElement>("[data-summary-note]");
  const resultEmpty = root.querySelector<HTMLElement>(".result-empty");
  const formError = root.querySelector<HTMLElement>("[data-form-error]");
  const printButton = root.querySelector<HTMLButtonElement>("[data-print-summary]");

  if (!form || !tool || !resultContent || !resultSentence || !resultBreakdown || !summaryNote || !resultEmpty || !formError || !printButton) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors(form);
    formError.hidden = true;

    try {
      const result = calculators[tool](form, new FormData(form));
      resultSentence.textContent = result.sentence;
      resultBreakdown.innerHTML = result.rows
        .map((row) => `<div><dt>${row.label}</dt><dd>${row.value}</dd></div>`)
        .join("");
      summaryNote.textContent = result.note;
      resultContent.hidden = false;
      resultEmpty.hidden = true;
      printButton.hidden = false;
    } catch (error) {
      formError.hidden = false;
      formError.textContent =
        error instanceof Error ? error.message : "Please review the highlighted fields.";
    }
  });

  form.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
      target.removeAttribute("aria-invalid");
      const error = form.querySelector<HTMLElement>(`[data-field-error="${target.name}"]`);
      if (error) {
        error.hidden = true;
        error.textContent = "";
      }
    }
  });

  form.addEventListener("reset", () => {
    clearErrors(form);
    formError.hidden = true;
    resultContent.hidden = true;
    resultEmpty.hidden = false;
    printButton.hidden = true;
  });

  printButton.addEventListener("click", () => {
    window.print();
  });
});
