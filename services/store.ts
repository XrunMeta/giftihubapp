import { apiFetch } from "./api";
import { resolveImageUrl } from "@/lib/image";

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

export function getProductImageUrl(product: Product): string | null {
  return resolveImageUrl(product.thumb_url, product.image_url, product.brand_logo);
}

export function getProductFullImageUrl(product: Product): string | null {
  return resolveImageUrl(product.image_url, product.brand_logo);
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

export async function getStoreProducts(): Promise<StoreResponse> {
  return apiFetch<StoreResponse>("/oth-path", { skipAuth: true });
}

export interface ProductDetailResponse {
  product: Product;
  rates: Record<string, number>;
}

export async function getProductDetail(id: string): Promise<ProductDetailResponse> {
  return apiFetch<ProductDetailResponse>(`/oth-path${id}`, { skipAuth: true });
}

export async function purchaseProduct(
  id: string,
  paymentMethod: PaymentMethod,
  flexibleAmount?: number,
): Promise<PurchaseResponse> {
  return apiFetch<PurchaseResponse>(`/oth-path${id}/purchase`, {
    method: "POST",
    body: JSON.stringify({
      payment_method: paymentMethod,
      flexible_amount: flexibleAmount,
    }),
  });
}
