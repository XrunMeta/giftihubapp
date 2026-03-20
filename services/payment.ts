import { v_bc1b24 } from "./api";

export interface PaymentStatus {
  id: string;
  status: "pending" | "completed" | "failed" | "expired" | "refunded";
  payment_method: string;
  amount_usd: number;
  tx_hash?: string | null;
}

export async function v_9f95ab(
  v_625990,
): Promise<PaymentStatus> {
  return v_bc1b24<PaymentStatus>(`/oth-path${v_625990}/status`);
}
