import {
  calculateBreakEven,
  calculateCpm,
  calculateMargin,
  calculateMarkup,
  calculateNpv,
  calculateProfit
} from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import type { CalculationResult } from "@/lib/types";

const getInput = (form: HTMLFormElement, name: string) => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLSelectElement ? field : null;
};

const getNumber = (formData: FormData, name: string) => {
  const raw = formData.get(name);
  if (raw === null || raw === "") {
    return NaN;
  }
  return Number(raw);
};

const setFieldError = (
  form: HTMLFormElement,
  name: string,
  message: string
) => {
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

const calculators: Record<string, (form: HTMLFormElement, formData: FormData) => CalculationResult> = {
  "margin-calculator": (form, formData) => {
    const okayRevenue = validateRequired(form, "revenue", "Please enter a selling price.");
    const okayCost = validateRequired(form, "cost", "Please enter your cost.");
    const revenue = getNumber(formData, "revenue");
    const cost = getNumber(formData, "cost");

    if (!okayRevenue || !okayCost) {
      throw new Error("Please complete the required fields.");
    }

    if (revenue === 0) {
      setFieldError(form, "revenue", "Please enter a selling price greater than zero.");
      throw new Error("Margin cannot be calculated from zero revenue.");
    }

    return calculateMargin(revenue, cost);
  },
  "markup-calculator": (form, formData) => {
    const okayCost = validateRequired(form, "cost", "Please enter your cost.");
    const okayMarkup = validateRequired(form, "markupPercent", "Please enter a markup percentage.");
    if (!okayCost || !okayMarkup) {
      throw new Error("Please complete the required fields.");
    }

    return calculateMarkup(getNumber(formData, "cost"), getNumber(formData, "markupPercent"));
  },
  "break-even-calculator": (form, formData) => {
    const checks = [
      validateRequired(form, "fixedCosts", "Please enter fixed costs."),
      validateRequired(form, "pricePerUnit", "Please enter a price per unit."),
      validateRequired(form, "variableCostPerUnit", "Please enter a variable cost per unit.")
    ];
    if (checks.includes(false)) {
      throw new Error("Please complete the required fields.");
    }

    const fixedCosts = getNumber(formData, "fixedCosts");
    const pricePerUnit = getNumber(formData, "pricePerUnit");
    const variableCostPerUnit = getNumber(formData, "variableCostPerUnit");

    if (pricePerUnit <= variableCostPerUnit) {
      setFieldError(
        form,
        "pricePerUnit",
        "Price per unit must be greater than variable cost per unit."
      );
      setFieldError(
        form,
        "variableCostPerUnit",
        "Break-even is impossible when each unit does not contribute profit."
      );
      throw new Error(
        "Break-even cannot be reached because price per unit is less than or equal to variable cost per unit."
      );
    }

    return calculateBreakEven(fixedCosts, pricePerUnit, variableCostPerUnit);
  },
  "profit-calculator": (form, formData) => {
    const checks = [
      validateRequired(form, "revenue", "Please enter revenue."),
      validateRequired(form, "cogs", "Please enter cost of goods sold."),
      validateRequired(form, "operatingExpenses", "Please enter operating expenses.")
    ];
    if (checks.includes(false)) {
      throw new Error("Please complete the required fields.");
    }

    return calculateProfit(
      getNumber(formData, "revenue"),
      getNumber(formData, "cogs"),
      getNumber(formData, "operatingExpenses"),
      Number.isNaN(getNumber(formData, "otherExpenses")) ? 0 : getNumber(formData, "otherExpenses")
    );
  },
  "cpm-calculator": (form, formData) => {
    const checks = [
      validateRequired(form, "adCost", "Please enter ad cost."),
      validateRequired(form, "impressions", "Please enter impressions.")
    ];
    if (checks.includes(false)) {
      throw new Error("Please complete the required fields.");
    }

    const impressions = getNumber(formData, "impressions");
    if (impressions === 0) {
      setFieldError(form, "impressions", "Please enter impressions greater than zero.");
      throw new Error("CPM cannot be calculated with zero impressions.");
    }

    return calculateCpm(getNumber(formData, "adCost"), impressions);
  },
  "npv-calculator": (form, formData) => {
    const checks = [
      validateRequired(form, "initialInvestment", "Please enter the initial investment."),
      validateRequired(form, "discountRate", "Please enter the discount rate.")
    ];
    const cashFlows = ["cashFlow1", "cashFlow2", "cashFlow3", "cashFlow4", "cashFlow5"].map((name) =>
      getNumber(formData, name)
    );
    const hasAtLeastOneCashFlow = cashFlows.some((value) => Number.isFinite(value) && value !== 0);

    if (!hasAtLeastOneCashFlow) {
      setFieldError(form, "cashFlow1", "Please enter at least one yearly cash flow.");
      throw new Error("Please enter at least one yearly cash flow.");
    }

    if (checks.includes(false)) {
      throw new Error("Please complete the required fields.");
    }

    return calculateNpv(
      getNumber(formData, "initialInvestment"),
      getNumber(formData, "discountRate"),
      cashFlows.map((value) => (Number.isFinite(value) ? value : 0))
    );
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
