const roundTo = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((Number.isFinite(value) ? value : 0) * factor) / factor;
};

export const roundMoney = (value: number) => roundTo(value, 2);
export const roundPercent = (value: number) => roundTo(value, 2);

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(roundMoney(value));
}

export function formatPercent(value: number): string {
  return `${roundPercent(value).toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(roundTo(value, 2));
}
