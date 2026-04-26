import type { ToolConfig, ToolSlug } from "@/lib/types";
import { site } from "@/data/site";

export const tools: Record<ToolSlug, ToolConfig> = {
  "margin-calculator": {
    slug: "margin-calculator",
    name: "Margin Calculator",
    navLabel: "Margin",
    metaTitle: "Margin Calculator | Calculate Profit Margin and Markup",
    metaDescription:
      "Calculate gross profit, margin percentage, and markup percentage from selling price and cost.",
    intro: "Calculate gross profit, margin, and markup from selling price and cost.",
    interpretationLabel: "Margin summary",
    sections: [
      {
        title: "Revenue and Cost",
        description: "Use selling price or revenue on the same basis as cost.",
        fields: [
          {
            name: "revenue",
            label: "Selling price / revenue",
            type: "currency",
            placeholder: "100",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "cost",
            label: "Cost",
            type: "currency",
            placeholder: "60",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          }
        ]
      }
    ],
    formulas: [
      { label: "Gross profit", expression: "Revenue - Cost" },
      { label: "Margin %", expression: "((Revenue - Cost) / Revenue) × 100" },
      { label: "Markup %", expression: "((Revenue - Cost) / Cost) × 100" }
    ],
    methodology: [
      "Subtract cost from revenue to get gross profit.",
      "Divide gross profit by revenue to calculate margin.",
      "Divide gross profit by cost to calculate markup."
    ],
    example: {
      title: "Worked example",
      summary: "If you sell something for $100 and it costs $60, here is what the math shows.",
      steps: [
        "Gross profit is $100 - $60 = $40.",
        "Margin is $40 / $100 = 40.00%.",
        "Markup is $40 / $60 = 66.67%."
      ]
    },
    faqs: [
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin uses revenue as the base. Markup uses cost as the base. They are related, but they are not interchangeable."
      },
      {
        question: "Why can margin not be calculated from zero revenue?",
        answer:
          "Margin divides profit by revenue, so zero revenue would cause a divide-by-zero problem."
      },
      {
        question: "Can margin be negative?",
        answer:
          "Yes. If cost is higher than selling price, gross profit is negative and margin will also be negative."
      },
      {
        question: "When should I use margin instead of markup?",
        answer:
          "Use margin when you want to understand profit as a share of selling price. Use markup when pricing from cost."
      }
    ],
    relatedTools: ["markup-calculator", "profit-calculator", "break-even-calculator"],
    resultDisclaimer: site.disclaimer
  },
  "markup-calculator": {
    slug: "markup-calculator",
    name: "Markup Calculator",
    navLabel: "Markup",
    metaTitle: "Markup Calculator | Find Selling Price From Cost and Markup",
    metaDescription:
      "Find selling price, profit, and resulting margin from cost and markup percentage.",
    intro: "Find selling price, profit, and resulting margin from cost and markup.",
    interpretationLabel: "Markup summary",
    sections: [
      {
        title: "Cost and Markup",
        description: "Use markup when you are pricing from cost instead of pricing from target margin.",
        fields: [
          {
            name: "cost",
            label: "Cost",
            type: "currency",
            placeholder: "50",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "markupPercent",
            label: "Markup percentage",
            type: "number",
            placeholder: "40",
            min: 0,
            step: 0.01,
            required: true,
            width: "short",
            suffix: "%"
          }
        ]
      }
    ],
    formulas: [
      { label: "Selling price", expression: "Cost × (1 + Markup % / 100)" },
      { label: "Profit", expression: "Selling price - Cost" },
      { label: "Margin %", expression: "(Profit / Selling price) × 100" }
    ],
    methodology: [
      "Multiply cost by one plus the markup percentage.",
      "Subtract cost from the selling price to get profit.",
      "Divide profit by selling price to show the resulting margin."
    ],
    example: {
      title: "Worked example",
      summary: "If your cost is $50 and you want a 40% markup, here is the result.",
      steps: [
        "Selling price is $50 × 1.40 = $70.00.",
        "Profit is $70.00 - $50.00 = $20.00.",
        "Margin is $20.00 / $70.00 = 28.57%."
      ]
    },
    faqs: [
      {
        question: "Does a 40% markup mean a 40% margin?",
        answer:
          "No. A 40% markup on cost results in a lower margin because margin is measured against the final selling price."
      },
      {
        question: "Why does margin end up smaller than markup?",
        answer:
          "Margin uses selling price as the denominator, so it will usually be lower than markup for the same scenario."
      },
      {
        question: "Can I use this for services?",
        answer:
          "Yes. If you know your true delivery cost or labor cost, the same pricing math applies."
      }
    ],
    relatedTools: ["margin-calculator", "profit-calculator"],
    resultDisclaimer: site.disclaimer
  },
  "break-even-calculator": {
    slug: "break-even-calculator",
    name: "Break-Even Calculator",
    navLabel: "Break-Even",
    metaTitle: "Break-Even Calculator | Calculate Units and Revenue Needed",
    metaDescription:
      "Calculate break-even units and break-even revenue from fixed costs, price per unit, and variable cost per unit.",
    intro: "Calculate the units and revenue needed to break even.",
    interpretationLabel: "Break-even summary",
    sections: [
      {
        title: "Costs and Unit Economics",
        description: "Break-even depends on how much each unit contributes after variable cost.",
        fields: [
          {
            name: "fixedCosts",
            label: "Fixed costs",
            type: "currency",
            placeholder: "5000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "pricePerUnit",
            label: "Price per unit",
            type: "currency",
            placeholder: "50",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "variableCostPerUnit",
            label: "Variable cost per unit",
            type: "currency",
            placeholder: "30",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          }
        ]
      }
    ],
    formulas: [
      { label: "Contribution margin per unit", expression: "Price per unit - Variable cost per unit" },
      { label: "Break-even units", expression: "Fixed costs / Contribution margin per unit" },
      { label: "Break-even revenue", expression: "Break-even units × Price per unit" }
    ],
    methodology: [
      "Calculate how much profit each unit contributes after variable cost.",
      "Divide fixed costs by contribution margin per unit.",
      "Multiply the resulting break-even units by price per unit to get break-even revenue."
    ],
    example: {
      title: "Worked example",
      summary: "If fixed costs are $5,000, price per unit is $50, and variable cost per unit is $30, here is the result.",
      steps: [
        "Contribution margin per unit is $50 - $30 = $20.",
        "Break-even units are $5,000 / $20 = 250.",
        "Break-even revenue is 250 × $50 = $12,500."
      ]
    },
    faqs: [
      {
        question: "What if price per unit is less than variable cost per unit?",
        answer:
          "Break-even cannot be reached because each unit sold is not contributing positive profit toward fixed costs."
      },
      {
        question: "Should I round up break-even units?",
        answer:
          "In real planning, yes. If the calculator returns a fraction, you usually need to sell the next whole unit."
      },
      {
        question: "Do fixed costs include owner salary?",
        answer:
          "If you want break-even to reflect the full business target, include any recurring cost you need the business to cover."
      }
    ],
    relatedTools: ["profit-calculator", "margin-calculator"],
    resultDisclaimer: site.disclaimer
  },
  "profit-calculator": {
    slug: "profit-calculator",
    name: "Profit Calculator",
    navLabel: "Profit",
    metaTitle: "Profit Calculator | Gross Profit, Net Profit, and Margins",
    metaDescription:
      "Calculate gross profit, net profit, gross margin, and net margin from revenue, COGS, and operating expenses.",
    intro: "Calculate gross profit, net profit, and margins from key business costs.",
    interpretationLabel: "Profit summary",
    sections: [
      {
        title: "Revenue and Expenses",
        description: "Use the same period for every input, such as monthly, quarterly, or per project.",
        fields: [
          {
            name: "revenue",
            label: "Revenue",
            type: "currency",
            placeholder: "10000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "cogs",
            label: "Cost of goods sold",
            type: "currency",
            placeholder: "4000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "operatingExpenses",
            label: "Operating expenses",
            type: "currency",
            placeholder: "2500",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "otherExpenses",
            label: "Other expenses",
            type: "currency",
            placeholder: "0",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$",
            help: "Optional. Leave blank to treat as zero."
          }
        ]
      }
    ],
    formulas: [
      { label: "Gross profit", expression: "Revenue - COGS" },
      { label: "Net profit", expression: "Revenue - COGS - Operating expenses - Other expenses" },
      { label: "Gross margin %", expression: "(Gross profit / Revenue) × 100" },
      { label: "Net margin %", expression: "(Net profit / Revenue) × 100" }
    ],
    methodology: [
      "Subtract COGS from revenue to get gross profit.",
      "Subtract operating and other expenses to get net profit.",
      "Divide each profit figure by revenue to get the matching margin percentage."
    ],
    example: {
      title: "Worked example",
      summary: "If revenue is $10,000, COGS is $4,000, operating expenses are $2,500, and other expenses are $500, here is the result.",
      steps: [
        "Gross profit is $10,000 - $4,000 = $6,000.",
        "Net profit is $10,000 - $4,000 - $2,500 - $500 = $3,000.",
        "Gross margin is 60.00%, and net margin is 30.00%."
      ]
    },
    faqs: [
      {
        question: "What is the difference between gross profit and net profit?",
        answer:
          "Gross profit stops after cost of goods sold. Net profit subtracts operating and other expenses as well."
      },
      {
        question: "What if net profit is negative?",
        answer:
          "That means the business is operating at a loss for the scenario you entered."
      },
      {
        question: "Should I include owner draws as expenses?",
        answer:
          "That depends on how you analyze the business. Use whichever treatment is most useful for your planning view."
      }
    ],
    relatedTools: ["margin-calculator", "markup-calculator", "break-even-calculator"],
    resultDisclaimer: site.disclaimer
  },
  "cpm-calculator": {
    slug: "cpm-calculator",
    name: "CPM Calculator",
    navLabel: "CPM",
    metaTitle: "CPM Calculator | Cost Per Thousand Impressions",
    metaDescription:
      "Calculate CPM from ad cost and impressions to understand the cost of every 1,000 impressions.",
    intro: "Calculate CPM from ad cost and impressions.",
    interpretationLabel: "CPM summary",
    sections: [
      {
        title: "Ad Spend and Reach",
        description: "CPM tells you how much you pay for every 1,000 impressions.",
        fields: [
          {
            name: "adCost",
            label: "Ad cost",
            type: "currency",
            placeholder: "250",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "impressions",
            label: "Impressions",
            type: "number",
            placeholder: "50000",
            min: 0,
            step: 1,
            required: true,
            width: "medium"
          }
        ]
      }
    ],
    formulas: [{ label: "CPM", expression: "(Ad cost / Impressions) × 1000" }],
    methodology: [
      "Divide total ad cost by total impressions.",
      "Multiply the result by 1,000 to convert it into cost per thousand impressions."
    ],
    example: {
      title: "Worked example",
      summary: "If ad cost is $250 and impressions are 50,000, here is the result.",
      steps: [
        "Divide cost by impressions: $250 / 50,000 = 0.005.",
        "Multiply by 1,000 to get CPM.",
        "CPM is $5.00."
      ]
    },
    faqs: [
      {
        question: "What does CPM mean?",
        answer:
          "CPM stands for cost per thousand impressions. It measures how expensive reach is on an advertising channel."
      },
      {
        question: "Is lower CPM always better?",
        answer:
          "Not always. Lower CPM means cheaper reach, but it does not guarantee better clicks, leads, or sales."
      },
      {
        question: "Can I compare CPM across campaigns?",
        answer:
          "Yes, as long as the campaigns are using the same impression definition and similar targeting."
      }
    ],
    relatedTools: ["profit-calculator"],
    resultDisclaimer: site.disclaimer
  },
  "npv-calculator": {
    slug: "npv-calculator",
    name: "NPV Calculator",
    navLabel: "NPV",
    metaTitle: "NPV Calculator | Simple Net Present Value Calculator",
    metaDescription:
      "Estimate simple net present value from an initial investment, discount rate, and five yearly cash flow inputs.",
    intro: "Estimate net present value from an investment, discount rate, and projected cash flows.",
    interpretationLabel: "NPV summary",
    sections: [
      {
        title: "Investment Assumptions",
        description: "Use this as a simple planning estimate, not as professional financial advice.",
        fields: [
          {
            name: "initialInvestment",
            label: "Initial investment",
            type: "currency",
            placeholder: "10000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "discountRate",
            label: "Discount rate",
            type: "number",
            placeholder: "10",
            min: 0,
            step: 0.01,
            required: true,
            width: "short",
            suffix: "%"
          }
        ]
      },
      {
        title: "Yearly Cash Flows",
        description: "Enter at least one projected yearly cash flow. Blank years are treated as zero after the first entered cash flow.",
        fields: [
          { name: "cashFlow1", label: "Year 1 cash flow", type: "currency", placeholder: "3000", min: 0, step: 0.01, width: "medium", prefix: "$", required: true },
          { name: "cashFlow2", label: "Year 2 cash flow", type: "currency", placeholder: "3500", min: 0, step: 0.01, width: "medium", prefix: "$" },
          { name: "cashFlow3", label: "Year 3 cash flow", type: "currency", placeholder: "4000", min: 0, step: 0.01, width: "medium", prefix: "$" },
          { name: "cashFlow4", label: "Year 4 cash flow", type: "currency", placeholder: "4500", min: 0, step: 0.01, width: "medium", prefix: "$" },
          { name: "cashFlow5", label: "Year 5 cash flow", type: "currency", placeholder: "5000", min: 0, step: 0.01, width: "medium", prefix: "$" }
        ]
      }
    ],
    formulas: [
      { label: "NPV", expression: "Σ (Cash flow ÷ (1 + Discount rate)^Year) - Initial investment" }
    ],
    methodology: [
      "Discount each yearly cash flow back to present value using the discount rate.",
      "Add all discounted cash flows together.",
      "Subtract the initial investment to estimate NPV."
    ],
    example: {
      title: "Worked example",
      summary: "If you invest $10,000 today and expect five yearly cash flows at a 10% discount rate, NPV estimates whether the future value clears the upfront cost.",
      steps: [
        "Discount each yearly cash flow by year using the 10% rate.",
        "Add the discounted cash flows together.",
        "Subtract the initial investment to get the final NPV."
      ]
    },
    faqs: [
      {
        question: "What does a positive NPV mean?",
        answer:
          "A positive NPV suggests the projected cash flows exceed the discount-adjusted cost of the investment."
      },
      {
        question: "What discount rate should I use?",
        answer:
          "Use a rate that reflects your required return, financing cost, or opportunity cost. This tool does not choose it for you."
      },
      {
        question: "Is this calculator financial advice?",
        answer:
          "No. It is a simple educational estimate and should not replace professional financial or accounting advice."
      }
    ],
    relatedTools: ["profit-calculator", "break-even-calculator"],
    resultDisclaimer: site.disclaimer
  }
};

export const orderedTools = [
  tools["margin-calculator"],
  tools["markup-calculator"],
  tools["break-even-calculator"],
  tools["profit-calculator"],
  tools["cpm-calculator"],
  tools["npv-calculator"]
];
