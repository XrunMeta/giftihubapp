const SYMBOLS: Record<string, string> = {
  KRW: "₩",
  USD: "$",
  IDR: "Rp",
  USDT: "USDT ",
};

export function currencySymbol(currency?: string | null): string {
  return SYMBOLS[currency ?? "KRW"] ?? "₩";
}

export function formatPrice(amount: number | null | undefined, currency?: string | null): string {
  const sym = currencySymbol(currency);
  return `${sym}${(amount ?? 0).toLocaleString()}`;
}
