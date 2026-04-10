import { v_bc1b24 } from "./api";
import type { v_88a3f9, v_fba7e7 } from "./store";

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
  set_id?: string | null;
  set_count?: number | null;
  currency?: string;
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
  keyword?: number;
  q?: string;
  sort?: MarketplaceSort;
}

export interface Keyword {
  id: number;
  name: string;
  name_en: string | null;
  name_id: string | null;
  display_order: number;
}

export async function v_cf7450(): Promise<{ keywords: Keyword[] }> {
  return v_bc1b24("/oth-path", { skipAuth: true });
}

export async function v_113fd3(
  v_24baff,
): Promise<{ listings: MarketplaceListing[] }> {
  const v_a3f1ae = new URLSearchParams();
  if (v_24baff?.category) v_a3f1ae.set("category", v_24baff.category);
  if (v_24baff?.keyword) v_a3f1ae.set("keyword", String(v_24baff.keyword));
  if (v_24baff?.q) v_a3f1ae.set("q", v_24baff.q);
  if (v_24baff?.sort) v_a3f1ae.set("sort", v_24baff.sort);
  const v_7c5791 = v_a3f1ae.toString();
  return v_bc1b24(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ""}`, {
    skipAuth: true,
  });
}

export interface SetVoucher {
  brand: string;
  name: string;
  face_value: number;
  face_value_base: number;
  base_currency: string;
}

export async function v_eeb70f(
  v_389afb,
): Promise<{ listing: MarketplaceListing; set_vouchers: SetVoucher[] }> {
  return v_bc1b24(`/oth-path${v_389afb}`, { skipAuth: true });
}

export async function v_86db47(
  v_ba63f8,
  v_7ae44d,
  v_8b9cd4,
): Promise<{ ok: true; listing_id: string; fee: number; estimated_payout: number }> {
  return v_bc1b24("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      voucher_id: v_ba63f8,
      selling_price: v_7ae44d,
      category: v_8b9cd4,
    }),
  });
}

export async function v_37e5b4(
  v_4b65e3,
  paymentMethod: v_88a3f9,
): Promise<v_fba7e7> {
  return v_bc1b24(`/oth-path${v_4b65e3}/purchase`, {
    method: "POST",
    body: JSON.stringify({ payment_method: v_2891ab }),
  });
}

export async function v_e7fbfb(
  v_389afb,
): Promise<{ ok: true }> {
  return v_bc1b24(`/oth-path${v_389afb}`, { method: "DELETE" });
}

export interface MyListing {
  id: string;
  voucher_id: string | null;
  set_id: string | null;
  status: string;
  selling_price: number;
}

export async function v_ce2ac9(): Promise<{ listings: MyListing[] }> {
  return v_bc1b24(`/oth-path`);
}

export async function v_c910b4(v_328259): Promise<MyListing | null> {
  const { listings: v_795bbd } = await v_ce2ac9();
  const v_715950 = v_795bbd.find(
    (v_1614db) =>
      v_1614db.status === "active" &&
      ((v_328259.voucherId && v_1614db.voucher_id === v_328259.voucherId) ||
        (v_328259.setId && v_1614db.set_id === v_328259.setId)),
  );
  return v_715950 ?? null;
}

export async function v_aee327(
  v_90a2ba,
  v_7ae44d,
  v_8b9cd4,
): Promise<{ ok: true; listing_id: string; voucher_count: number; fee: number; estimated_payout: number }> {
  return v_bc1b24("/oth-path", {
    method: "POST",
    body: JSON.stringify({
      set_id: v_90a2ba,
      selling_price: v_7ae44d,
      category: v_8b9cd4,
    }),
  });
}

