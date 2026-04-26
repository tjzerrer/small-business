export type ToolSlug =
  | "margin-calculator"
  | "markup-calculator"
  | "break-even-calculator"
  | "profit-calculator"
  | "cpm-calculator"
  | "npv-calculator"
  | "roi-calculator"
  | "pricing-calculator"
  | "contribution-margin-calculator"
  | "customer-acquisition-cost-calculator"
  | "lifetime-value-calculator"
  | "discount-calculator";

export type ToolField =
  | {
      name: string;
      label: string;
      type: "currency" | "number";
      placeholder?: string;
      min?: number;
      max?: number;
      step?: number;
      required?: boolean;
      width?: "short" | "medium";
      suffix?: string;
      prefix?: string;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      required?: boolean;
      width?: "short" | "medium";
      options: Array<{ label: string; value: string }>;
      help?: string;
    };

export type ToolSection = {
  title: string;
  description: string;
  fields: ToolField[];
};

export type FormulaLine = {
  label: string;
  expression: string;
};

export type ExampleBlock = {
  title: string;
  summary: string;
  steps: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ToolConfig = {
  slug: ToolSlug;
  name: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: ToolSection[];
  interpretationLabel: string;
  formulas: FormulaLine[];
  methodology: string[];
  example: ExampleBlock;
  faqs: FaqItem[];
  relatedTools: ToolSlug[];
  resultDisclaimer?: string;
};

export type ResultRow = {
  label: string;
  value: string;
};

export type CalculationResult = {
  sentence: string;
  rows: ResultRow[];
  note: string;
};
