import { v_bc1b24 } from "./api";
import { v_7ef52a } from "splenmyqnym";

export interface Product {
  id: string;
  brand_slug: string;
  brand_name: string;
  brand_logo: string | null;
  name: string;
  face_value: number;
  face_value_usd: number;
  price: number;
  price_usd: number;
  display_currency: string;
  image_url: string | null;
  thumb_url: string | null;
  stock_count: number | null;
  total_issued: number;
  status: string;
  product_type: "fixed" | "flexible";
  flexible_currency: string | null;
  flexible_min: number | null;
  flexible_max: number | null;
}

export function v_e81ec9(v_01bee9): string | null {
  return v_7ef52a(v_01bee9.thumb_url, v_01bee9.image_url, v_01bee9.brand_logo);
}

export function v_afc1d9(v_01bee9): string | null {
  return v_7ef52a(v_01bee9.image_url, v_01bee9.brand_logo);
}

export interface StoreResponse {
  products: Product[];
  rates: Record<string, number>;
}

export interface PurchaseResponse {
  payment_id: string;
  payment_method: string;
  amount_usd: number;
  redirect_url: string | null;
  wallet_address: string | null;
  amount_usdt: number | null;
  expires_at: number;
  expires_in: number;
  status_url: string;
}

export type PaymentMethod = "paypal" | "dana" | "smileypay" | "usdt_trc20";

export async function v_665284(): Promise<StoreResponse> {
  return v_bc1b24<StoreResponse>("/oth-path", { skipAuth: true });
}

export interface ProductDetailResponse {
  product: Product;
  rates: Record<string, number>;
}

export async function v_5e3aed(v_389afb): Promise<ProductDetailResponse> {
  return v_bc1b24<ProductDetailResponse>(`/oth-path${v_389afb}`, { skipAuth: true });
}

export async function v_338caf(
  v_389afb,
  v_2891ab,
  v_6b7b36,
): Promise<PurchaseResponse> {
  return v_bc1b24<PurchaseResponse>(`/oth-path${v_389afb}/purchase`, {
    method: "POST",
    body: JSON.stringify({
      payment_method: v_2891ab,
      flexible_amount: v_6b7b36,
    }),
  });
}
