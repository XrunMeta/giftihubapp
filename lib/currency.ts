const v_ea2b8b = {
  KRW: "₩",
  USD: "$",
  IDR: "Rp",
  USDT: "USDT ",
};

export function v_581cd0(v_a832b3): string {
  return v_ea2b8b[v_a832b3 ?? "KRW"] ?? "₩";
}

export function v_be1e41(v_f63e09, v_a832b3): string {
  const v_c37780 = v_581cd0(v_a832b3);
  return `${v_c37780}${(v_f63e09 ?? 0).toLocaleString()}`;
}
