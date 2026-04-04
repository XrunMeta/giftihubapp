import { apiFetch } from "./api";
import type { PaymentMethod, PurchaseResponse } from "./store";

export interface BundleStandardItem {
  storage_id: string;
  name: string;
  brand_slug: string;
  brand_name: string;
  face_value: number;
  display_currency: string;
  quantity: number;
  subtotal: number;
  face_value_usd: number;
  image_url: string | null;
  thumb_url: string | null;
}

export interface BundleFlexibleItem {
  storage_id: string;
  name: string;
  flexible_amount: number;
  flexible_currency: string;
  flexible_amount_usd: number;
  flexible_amount_krw: number;
}

export interface BundleComposition {
  currency: string;
  target_amount: number;
  items: BundleStandardItem[];
  flexible_item: BundleFlexibleItem | null;
  total: number;
  overshoot: number;
  exact: boolean;
  total_usd: number;
  rates: { KRW: number; IDR: number };
  composed_at: number;
}

export interface BundlePreviewResponse {
  ok: boolean;
  composition: BundleComposition;
}

export async function getBundlePreview(
  amount: number,
  currency: string,
): Promise<BundlePreviewResponse> {
  return apiFetch<BundlePreviewResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ amount, currency }),
    skipAuth: true,
  });
}

export async function purchaseBundle(
  amount: number,
  currency: string,
  paymentMethod: PaymentMethod,
  composition: BundleComposition,
): Promise<PurchaseResponse> {
  return apiFetch<PurchaseResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      payment_method: paymentMethod,
      composition,
    }),
  });
}

export interface MerchantBundle {
  set_id: string;
  set_name: string;
  set_description: string | null;
  voucher_count: number;
  total_face_value: number;
  statuses: string;
}

export interface BundleSettlementRequest {
  id: string;
  bundle_id: string;
  purchase_price: number;
  fee_rate: number;
  fee_amount: number;
  net_amount: number;
  status: "pending" | "approved" | "rejected";
  created_at: number;
}

export async function getMyBundles(): Promise<{
  bundles: MerchantBundle[];
}> {
  return apiFetch("/oth-path");
}

export async function requestBundleSettlement(
  bundleId: string,
): Promise<BundleSettlementRequest & { ok?: boolean }> {
  return apiFetch("/oth-path", {
    method: "POST",
    body: JSON.stringify({ bundle_id: bundleId }),
  });
}

export async function getBundleSettlementRequests(): Promise<{
  requests: BundleSettlementRequest[];
}> {
  return apiFetch("/oth-path");
}
