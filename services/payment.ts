import { apiFetch } from "./api";

export interface PaymentStatus {
  id: string;
  status: "pending" | "completed" | "failed" | "expired" | "refunded";
  payment_method: string;
  amount_usd: number;
  tx_hash?: string | null;
}

export async function getPaymentStatus(
  paymentId: string,
): Promise<PaymentStatus> {
  return apiFetch<PaymentStatus>(`/oth-path${paymentId}/status`);
}
