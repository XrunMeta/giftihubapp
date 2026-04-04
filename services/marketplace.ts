import { apiFetch } from "./api";
import type { PaymentMethod, PurchaseResponse } from "./store";

export interface MarketplaceListing {
  id: string;
  brand: string;
  name: string;
  original_price: number;
  selling_price: number;
  discount: number;
  category: string;
  expiry_date: number;
  created_at: number;
  seller_name: string;
  seller_id?: string;
  image_url: string | null;
  thumb_url: string | null;
  brand_logo: string | null;
}

export type MarketplaceCategory =
  | "food"
  | "culture"
  | "convenience"
  | "beauty"
  | "etc";
export type MarketplaceSort = "price_asc" | "price_desc" | "newest";

interface ListingsParams {
  category?: MarketplaceCategory;
  q?: string;
  sort?: MarketplaceSort;
}

export async function getMarketplaceListings(
  params?: ListingsParams,
): Promise<{ listings: MarketplaceListing[] }> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.q) searchParams.set("q", params.q);
  if (params?.sort) searchParams.set("sort", params.sort);
  const query = searchParams.toString();
  return apiFetch(`/oth-path${query ? `?${query}` : ""}`, {
    skipAuth: true,
  });
}

export async function getListingDetail(
  id: string,
): Promise<{ listing: MarketplaceListing }> {
  return apiFetch(`/oth-path${id}`, { skipAuth: true });
}

export async function createListing(
  voucherId: string,
  sellingPrice: number,
  category?: string,
): Promise<{ ok: true; listing_id: string; fee: number; estimated_payout: number }> {
  return apiFetch("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      voucher_id: voucherId,
      selling_price: sellingPrice,
      category,
    }),
  });
}

export async function purchaseFromMarketplace(
  listingId: string,
  paymentMethod: PaymentMethod,
): Promise<PurchaseResponse> {
  return apiFetch(`/oth-path${listingId}/purchase`, {
    method: "POST",
    body: JSON.stringify({ payment_method: paymentMethod }),
  });
}

export async function cancelListing(
  id: string,
): Promise<{ ok: true }> {
  return apiFetch(`/oth-path${id}`, { method: "DELETE" });
}

export async function createSetListing(
  setId: string,
  sellingPrice: number,
  category?: string,
): Promise<{ ok: true; listing_id: string; voucher_count: number; fee: number; estimated_payout: number }> {
  return apiFetch("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      set_id: setId,
      selling_price: sellingPrice,
      category,
    }),
  });
}

