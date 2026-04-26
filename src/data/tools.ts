import type { ToolConfig, ToolSlug } from "@/lib/types";
import { site } from "@/data/site";

type HomeCategory = {
  id: string;
  title: string;
  description: string;
  tools: ToolSlug[];
};

const disclaimer = site.disclaimer;

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
          "Use margin when you want profit as a share of selling price. Use markup when you are pricing from cost."
      }
    ],
    relatedTools: [
      "markup-calculator",
      "pricing-calculator",
      "profit-calculator",
      "break-even-calculator"
    ],
    resultDisclaimer: disclaimer
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
        description: "Use markup when you are pricing from cost instead of starting with a target margin.",
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
          "Margin uses selling price as the denominator, so it is lower than markup for the same scenario."
      },
      {
        question: "Can I use this for services?",
        answer:
          "Yes. If you know your delivery cost or labor cost, the same pricing math applies."
      }
    ],
    relatedTools: [
      "margin-calculator",
      "pricing-calculator",
      "profit-calculator",
      "discount-calculator"
    ],
    resultDisclaimer: disclaimer
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
      "Multiply break-even units by price per unit to get break-even revenue."
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
        question: "Should I round break-even units up?",
        answer:
          "In real planning, yes. If the result is not a whole unit, you usually need to sell the next full unit."
      },
      {
        question: "Do fixed costs include owner salary?",
        answer:
          "Include any recurring cost you want the business to cover in the scenario you are planning."
      }
    ],
    relatedTools: [
      "contribution-margin-calculator",
      "profit-calculator",
      "margin-calculator",
      "roi-calculator"
    ],
    resultDisclaimer: disclaimer
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
      "Subtract cost of goods sold from revenue to get gross profit.",
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
          "Gross profit stops after cost of goods sold. Net profit also subtracts operating and other expenses."
      },
      {
        question: "What if net profit is negative?",
        answer:
          "That means the business is operating at a loss for the numbers you entered."
      },
      {
        question: "Should I include owner draws as expenses?",
        answer:
          "That depends on the view you want. Use whichever treatment is most useful for your planning."
      }
    ],
    relatedTools: [
      "margin-calculator",
      "markup-calculator",
      "pricing-calculator",
      "break-even-calculator",
      "roi-calculator"
    ],
    resultDisclaimer: disclaimer
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
          "Yes, as long as the campaigns use the same impression definition and similar targeting."
      }
    ],
    relatedTools: [
      "customer-acquisition-cost-calculator",
      "lifetime-value-calculator",
      "profit-calculator",
      "roi-calculator"
    ],
    resultDisclaimer: disclaimer
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
        description:
          "Enter at least one projected yearly cash flow. Blank years are treated as zero after the first entered cash flow.",
        fields: [
          {
            name: "cashFlow1",
            label: "Year 1 cash flow",
            type: "currency",
            placeholder: "3000",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$",
            required: true
          },
          {
            name: "cashFlow2",
            label: "Year 2 cash flow",
            type: "currency",
            placeholder: "3500",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$"
          },
          {
            name: "cashFlow3",
            label: "Year 3 cash flow",
            type: "currency",
            placeholder: "4000",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$"
          },
          {
            name: "cashFlow4",
            label: "Year 4 cash flow",
            type: "currency",
            placeholder: "4500",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$"
          },
          {
            name: "cashFlow5",
            label: "Year 5 cash flow",
            type: "currency",
            placeholder: "5000",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$"
          }
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
      summary:
        "If you invest $10,000 today and expect five yearly cash flows at a 10% discount rate, NPV estimates whether the future value clears the upfront cost.",
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
    relatedTools: [
      "roi-calculator",
      "profit-calculator",
      "break-even-calculator",
      "lifetime-value-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "roi-calculator": {
    slug: "roi-calculator",
    name: "ROI Calculator",
    navLabel: "ROI",
    metaTitle: "ROI Calculator | Calculate Return on Investment",
    metaDescription:
      "Calculate net gain and ROI percentage from gain and cost of investment with a plain-English explanation.",
    intro: "Calculate return on investment from gain and cost.",
    interpretationLabel: "ROI summary",
    sections: [
      {
        title: "Investment Inputs",
        description: "Use the total gain returned by the investment and the total cost you put into it.",
        fields: [
          {
            name: "gainFromInvestment",
            label: "Gain from investment",
            type: "currency",
            placeholder: "15000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "costOfInvestment",
            label: "Cost of investment",
            type: "currency",
            placeholder: "10000",
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
      { label: "Net gain", expression: "Gain from investment - Cost of investment" },
      {
        label: "ROI %",
        expression: "((Gain from investment - Cost of investment) / Cost of investment) × 100"
      }
    ],
    methodology: [
      "Subtract the cost of investment from the gain to get net gain.",
      "Divide net gain by the cost of investment.",
      "Multiply by 100 to express ROI as a percentage."
    ],
    example: {
      title: "Worked example",
      summary: "If an investment returns $15,000 and it cost $10,000, here is the result.",
      steps: [
        "Net gain is $15,000 - $10,000 = $5,000.",
        "ROI is $5,000 / $10,000 = 0.50.",
        "ROI is 50.00%."
      ]
    },
    faqs: [
      {
        question: "What does a negative ROI mean?",
        answer:
          "A negative ROI means the investment lost money relative to what it cost."
      },
      {
        question: "Can ROI be more than 100%?",
        answer:
          "Yes. An ROI above 100% means the net gain is larger than the original cost."
      },
      {
        question: "Why can cost of investment not be zero?",
        answer:
          "ROI divides by cost of investment, so a zero cost would make the percentage undefined."
      }
    ],
    relatedTools: [
      "profit-calculator",
      "break-even-calculator",
      "npv-calculator",
      "pricing-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "pricing-calculator": {
    slug: "pricing-calculator",
    name: "Pricing Calculator",
    navLabel: "Pricing",
    metaTitle: "Pricing Calculator | Set Selling Price From Margin or Markup",
    metaDescription:
      "Set a selling price from cost and a target margin or markup, then see resulting profit, margin, and markup.",
    intro: "Choose a selling price from cost and a target margin or markup.",
    interpretationLabel: "Pricing summary",
    sections: [
      {
        title: "Pricing Inputs",
        description: "Choose whether you want to price from a target margin or a target markup.",
        fields: [
          {
            name: "cost",
            label: "Cost per item or service",
            type: "currency",
            placeholder: "50",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "pricingMode",
            label: "Pricing mode",
            type: "select",
            required: true,
            width: "medium",
            options: [
              { label: "Target markup", value: "markup" },
              { label: "Target margin", value: "margin" }
            ]
          },
          {
            name: "targetPercent",
            label: "Target percentage",
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
      { label: "Markup mode", expression: "Selling price = Cost × (1 + Markup % / 100)" },
      { label: "Margin mode", expression: "Selling price = Cost ÷ (1 - Margin % / 100)" }
    ],
    methodology: [
      "If you choose markup mode, add the markup percentage on top of cost.",
      "If you choose margin mode, solve for the selling price that leaves the desired profit share after cost.",
      "Then calculate profit per sale, resulting margin, and resulting markup from that price."
    ],
    example: {
      title: "Worked example",
      summary:
        "If your cost is $50 and you want a 40% target margin, the calculator solves for the price that keeps 40% of each sale as gross profit.",
      steps: [
        "Selling price is $50 ÷ (1 - 0.40) = $83.33.",
        "Profit per sale is $83.33 - $50.00 = $33.33.",
        "Resulting markup is 66.67%."
      ]
    },
    faqs: [
      {
        question: "When should I use target margin instead of target markup?",
        answer:
          "Use target margin when you care about profit as a share of selling price. Use target markup when you price directly from cost."
      },
      {
        question: "Why must target margin be less than 100%?",
        answer:
          "A 100% margin would imply no cost at all relative to price, which makes the formula impossible for normal pricing."
      },
      {
        question: "Does this calculator include taxes or fees?",
        answer:
          "No. It is focused on pricing from cost and target profit percentage."
      }
    ],
    relatedTools: [
      "margin-calculator",
      "markup-calculator",
      "profit-calculator",
      "break-even-calculator",
      "discount-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "contribution-margin-calculator": {
    slug: "contribution-margin-calculator",
    name: "Contribution Margin Calculator",
    navLabel: "Contribution",
    metaTitle: "Contribution Margin Calculator | Profit Per Unit and Break-Even Help",
    metaDescription:
      "Calculate contribution margin per unit, contribution margin ratio, and optional break-even units from selling price and variable cost.",
    intro: "Measure profit contribution per unit and optional break-even units.",
    interpretationLabel: "Contribution margin summary",
    sections: [
      {
        title: "Unit Economics",
        description: "Use one unit of price and variable cost on the same basis.",
        fields: [
          {
            name: "sellingPricePerUnit",
            label: "Selling price per unit",
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
          },
          {
            name: "fixedCosts",
            label: "Fixed costs",
            type: "currency",
            placeholder: "5000",
            min: 0,
            step: 0.01,
            width: "medium",
            prefix: "$",
            help: "Optional. Add this if you also want break-even units."
          }
        ]
      }
    ],
    formulas: [
      { label: "Contribution margin per unit", expression: "Selling price per unit - Variable cost per unit" },
      {
        label: "Contribution margin ratio",
        expression: "(Contribution margin per unit / Selling price per unit) × 100"
      },
      { label: "Break-even units", expression: "Fixed costs ÷ Contribution margin per unit" }
    ],
    methodology: [
      "Subtract variable cost from selling price to get contribution margin per unit.",
      "Divide contribution margin per unit by selling price to get the contribution margin ratio.",
      "If fixed costs are entered, divide fixed costs by contribution margin per unit to estimate break-even units."
    ],
    example: {
      title: "Worked example",
      summary:
        "If you sell a unit for $50 and the variable cost is $30, the contribution margin per unit is the amount left to cover fixed costs and profit.",
      steps: [
        "Contribution margin per unit is $50 - $30 = $20.",
        "Contribution margin ratio is $20 / $50 = 40.00%.",
        "If fixed costs are $5,000, break-even units are $5,000 / $20 = 250."
      ]
    },
    faqs: [
      {
        question: "What does contribution margin tell me?",
        answer:
          "It shows how much each sale contributes toward fixed costs and profit after variable cost is covered."
      },
      {
        question: "What if selling price is equal to variable cost?",
        answer:
          "That means each sale contributes zero toward fixed costs or profit, so break-even cannot be reached."
      },
      {
        question: "Do I need fixed costs to use this calculator?",
        answer:
          "No. Fixed costs are optional and only needed if you also want break-even units."
      }
    ],
    relatedTools: [
      "break-even-calculator",
      "margin-calculator",
      "pricing-calculator",
      "profit-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "customer-acquisition-cost-calculator": {
    slug: "customer-acquisition-cost-calculator",
    name: "Customer Acquisition Cost Calculator",
    navLabel: "CAC",
    metaTitle: "Customer Acquisition Cost Calculator | Calculate CAC",
    metaDescription:
      "Calculate customer acquisition cost from total marketing or sales spend and the number of new customers acquired.",
    intro: "Calculate customer acquisition cost from spend and new customers acquired.",
    interpretationLabel: "CAC summary",
    sections: [
      {
        title: "Acquisition Inputs",
        description: "Use the same time period for spend and customer counts.",
        fields: [
          {
            name: "marketingSpend",
            label: "Total marketing / sales spend",
            type: "currency",
            placeholder: "5000",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "newCustomers",
            label: "New customers acquired",
            type: "number",
            placeholder: "50",
            min: 0,
            step: 1,
            required: true,
            width: "short"
          }
        ]
      }
    ],
    formulas: [{ label: "CAC", expression: "Total marketing / sales spend ÷ New customers acquired" }],
    methodology: [
      "Take your total marketing or sales spend for the period.",
      "Divide it by the number of new customers acquired in that same period.",
      "The result is your average cost to acquire one new customer."
    ],
    example: {
      title: "Worked example",
      summary: "If you spend $5,000 and acquire 50 new customers, here is the result.",
      steps: [
        "Take total spend of $5,000.",
        "Divide by 50 new customers.",
        "CAC is $100.00 per customer."
      ]
    },
    faqs: [
      {
        question: "What counts as acquisition spend?",
        answer:
          "Use the marketing and sales costs you want to attribute to getting new customers in the same time period."
      },
      {
        question: "Why can new customers not be zero?",
        answer:
          "CAC divides spend by the number of customers acquired, so zero customers makes the result undefined."
      },
      {
        question: "Should I compare CAC to LTV?",
        answer:
          "Yes. CAC is more useful when you compare it to customer lifetime value."
      }
    ],
    relatedTools: [
      "lifetime-value-calculator",
      "profit-calculator",
      "roi-calculator",
      "cpm-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "lifetime-value-calculator": {
    slug: "lifetime-value-calculator",
    name: "Lifetime Value Calculator",
    navLabel: "LTV",
    metaTitle: "Lifetime Value Calculator | Estimate Customer Value Over Time",
    metaDescription:
      "Estimate customer lifetime value from average revenue, gross margin percentage, and customer lifespan in months.",
    intro: "Estimate customer lifetime value from revenue, margin, and lifespan.",
    interpretationLabel: "Lifetime value summary",
    sections: [
      {
        title: "Customer Value Inputs",
        description: "Use the average revenue and average lifespan that best match your current business model.",
        fields: [
          {
            name: "averageRevenuePerCustomer",
            label: "Average revenue per customer",
            type: "currency",
            placeholder: "150",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "grossMarginPercent",
            label: "Gross margin percentage",
            type: "number",
            placeholder: "70",
            min: 0,
            max: 100,
            step: 0.01,
            required: true,
            width: "short",
            suffix: "%"
          },
          {
            name: "customerLifespanMonths",
            label: "Customer lifespan",
            type: "number",
            placeholder: "12",
            min: 0,
            step: 1,
            required: true,
            width: "short",
            suffix: "months"
          }
        ]
      }
    ],
    formulas: [
      { label: "LTV", expression: "Average revenue per customer × Gross margin % × Customer lifespan" }
    ],
    methodology: [
      "Convert gross margin percentage into a decimal.",
      "Multiply average revenue per customer by that margin.",
      "Multiply again by the average customer lifespan in months."
    ],
    example: {
      title: "Worked example",
      summary:
        "If average revenue per customer is $150, gross margin is 70%, and average lifespan is 12 months, here is the result.",
      steps: [
        "Gross profit per month is $150 × 0.70 = $105.",
        "Multiply $105 by 12 months.",
        "Estimated lifetime value is $1,260.00."
      ]
    },
    faqs: [
      {
        question: "Why use gross margin in LTV?",
        answer:
          "Gross margin gives a cleaner estimate of the value left after direct delivery cost, not just raw revenue."
      },
      {
        question: "Should customer lifespan be in months or years?",
        answer:
          "This calculator uses months so the result is consistent with monthly average revenue."
      },
      {
        question: "Can gross margin be 100%?",
        answer:
          "In practice, no. For this tool, gross margin should stay between 0% and 100%."
      }
    ],
    relatedTools: [
      "customer-acquisition-cost-calculator",
      "profit-calculator",
      "margin-calculator",
      "roi-calculator"
    ],
    resultDisclaimer: disclaimer
  },
  "discount-calculator": {
    slug: "discount-calculator",
    name: "Discount / Sale Price Calculator",
    navLabel: "Discount",
    metaTitle: "Discount Calculator | Find Sale Price and Savings",
    metaDescription:
      "Calculate discount amount, sale price, and savings percentage from an original price and discount percentage.",
    intro: "Calculate discount amount, sale price, and savings from an original price.",
    interpretationLabel: "Discount summary",
    sections: [
      {
        title: "Original Price and Discount",
        description: "Use this to check sale price, savings, or discount impact before you publish an offer.",
        fields: [
          {
            name: "originalPrice",
            label: "Original price",
            type: "currency",
            placeholder: "120",
            min: 0,
            step: 0.01,
            required: true,
            width: "medium",
            prefix: "$"
          },
          {
            name: "discountPercent",
            label: "Discount percentage",
            type: "number",
            placeholder: "25",
            min: 0,
            max: 100,
            step: 0.01,
            required: true,
            width: "short",
            suffix: "%"
          }
        ]
      }
    ],
    formulas: [
      { label: "Discount amount", expression: "Original price × Discount % / 100" },
      { label: "Sale price", expression: "Original price - Discount amount" }
    ],
    methodology: [
      "Multiply original price by the discount percentage to get the discount amount.",
      "Subtract the discount amount from the original price to get the sale price.",
      "Use the same discount percentage as the savings percentage."
    ],
    example: {
      title: "Worked example",
      summary: "If the original price is $120 and the discount is 25%, here is the result.",
      steps: [
        "Discount amount is $120 × 25% = $30.",
        "Sale price is $120 - $30 = $90.",
        "Savings percentage is 25.00%."
      ]
    },
    faqs: [
      {
        question: "Can discount percentage be more than 100%?",
        answer:
          "No. A discount above 100% would push the sale price below zero, which is not a normal sale."
      },
      {
        question: "Is sale price the same as margin?",
        answer:
          "No. Discounting changes the selling price, but margin depends on cost as well."
      },
      {
        question: "Can I use this for service discounts too?",
        answer:
          "Yes. The same percentage discount math applies to services as long as you start with the original price."
      }
    ],
    relatedTools: [
      "pricing-calculator",
      "margin-calculator",
      "markup-calculator",
      "profit-calculator"
    ],
    resultDisclaimer: disclaimer
  }
};

export const orderedTools: ToolConfig[] = [
  tools["margin-calculator"],
  tools["markup-calculator"],
  tools["pricing-calculator"],
  tools["profit-calculator"],
  tools["discount-calculator"],
  tools["break-even-calculator"],
  tools["contribution-margin-calculator"],
  tools["roi-calculator"],
  tools["npv-calculator"],
  tools["cpm-calculator"],
  tools["customer-acquisition-cost-calculator"],
  tools["lifetime-value-calculator"]
];

export const priorityTools: ToolConfig[] = [
  tools["margin-calculator"],
  tools["markup-calculator"],
  tools["break-even-calculator"],
  tools["profit-calculator"]
];

export const homepageCategories: HomeCategory[] = [
  {
    id: "pricing-profit",
    title: "Pricing & Profit",
    description: "Tools for pricing work, checking margins, and seeing how profit changes under different assumptions.",
    tools: [
      "margin-calculator",
      "markup-calculator",
      "pricing-calculator",
      "profit-calculator",
      "discount-calculator"
    ]
  },
  {
    id: "unit-economics",
    title: "Break-Even & Unit Economics",
    description: "Tools for break-even planning, per-unit contribution, investment returns, and simple capital decisions.",
    tools: [
      "break-even-calculator",
      "contribution-margin-calculator",
      "roi-calculator",
      "npv-calculator"
    ]
  },
  {
    id: "marketing-growth",
    title: "Marketing & Growth",
    description: "Tools for advertising efficiency, acquisition cost, and customer value over time.",
    tools: [
      "cpm-calculator",
      "customer-acquisition-cost-calculator",
      "lifetime-value-calculator"
    ]
  }
];
