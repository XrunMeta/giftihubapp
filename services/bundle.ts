import { v_bc1b24 } from "./api";
import type { v_88a3f9, v_fba7e7 } from "./store";

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

export async function v_664ac3(
  v_f63e09,
  v_a832b3,
): Promise<BundlePreviewResponse> {
  return v_bc1b24<BundlePreviewResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ amount: v_f63e09, currency: v_a832b3 }),
    skipAuth: true,
  });
}

export async function v_331c13(
  v_f63e09,
  v_a832b3,
  paymentMethod: v_88a3f9,
  v_247d1d,
): Promise<v_fba7e7> {
  return v_bc1b24<v_fba7e7>("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      amount: v_f63e09,
      currency: v_a832b3,
      payment_method: v_2891ab,
      composition: v_247d1d,
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

export async function v_60b706(): Promise<{
  bundles: MerchantBundle[];
}> {
  return v_bc1b24("/oth-path");
}

export async function v_9607ec(
  v_ff0ad4,
): Promise<BundleSettlementRequest & { ok?: boolean }> {
  return v_bc1b24("/oth-path", {
    method: "POST",
    body: JSON.stringify({ bundle_id: v_ff0ad4 }),
  });
}

export async function v_54a47e(): Promise<{
  requests: BundleSettlementRequest[];
}> {
  return v_bc1b24("/oth-path");
}
