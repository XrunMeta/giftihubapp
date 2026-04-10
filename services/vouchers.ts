import { v_bc1b24 } from "./api";

export interface Voucher {
  id: string;
  voucher_seq: string;
  brand: string;
  name: string;
  face_value: number;
  face_value_base: number;
  base_currency: string;
  status: "active" | "used" | "expired" | "transferred" | "listed";
  expiry_date: number;
  transfer_count: number;
  qr_token: string;
  created_at: number;
  updated_at: number;
  image_url: string | null;
  thumb_url: string | null;
  brand_logo: string | null;
  set_id: string | null;
  receipt_code?: string;
  cancel_request_pending?: boolean;
}

export type VoucherStatus =
  | "active"
  | "used"
  | "expired"
  | "transferred"
  | "listed";

export async function v_720509(
  v_d308b5,
  v_c874c0,
): Promise<{ vouchers: Voucher[] }> {
  const v_24baff = new URLSearchParams();
  if (v_d308b5) v_24baff.set("status", v_d308b5);
  if (v_c874c0) v_24baff.set("keyword", String(v_c874c0));
  const v_7c5791 = v_24baff.toString();
  return v_bc1b24<{ vouchers: Voucher[] }>(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ""}`);
}

export async function v_50a647(
  v_389afb,
): Promise<{ voucher: Voucher }> {
  return v_bc1b24<{ voucher: Voucher }>(`/oth-path${v_389afb}`);
}

export async function v_eaee10(
  v_389afb,
): Promise<{ barcode: string; expires_in: number }> {
  return v_bc1b24<{ barcode: string; expires_in: number }>(
    `/oth-path${v_389afb}/barcode`,
  );
}

export interface SetDetail {
  set: {
    id: string;
    creator_id: string;
    currency: string;
    total_amount: number;
    voucher_count: number;
    payment_id: string;
    created_at: number;
  };
  vouchers: Voucher[];
  summary: {
    total_count: number;
    active_count: number;
    total_value: number;
    all_active: boolean;
  };
}

export async function v_67877b(v_90a2ba): Promise<SetDetail> {
  return v_bc1b24<SetDetail>(`/oth-path${v_90a2ba}`);
}

export async function v_2b01b0(
  v_389afb,
  v_d29c07,
): Promise<{ ok: true; transfer_count: number }> {
  return v_bc1b24(`/oth-path${v_389afb}/transfer`, {
    method: "POST",
    body: JSON.stringify({ recipient_id: v_d29c07 }),
  });
}

export async function v_0e27e2(
  v_389afb,
  v_980f9f,
): Promise<{ ok: true; fee: number }> {
  return v_bc1b24(`/oth-path${v_389afb}/gift`, {
    method: "POST",
    body: JSON.stringify({ telegram_id: v_980f9f }),
  });
}

export async function v_4b3c52(
  v_389afb,
): Promise<{ ok: true }> {
  return v_bc1b24(`/oth-path${v_389afb}/use`, {
    method: "POST",
  });
}

export interface SearchUser {
  id: string;
  name: string;
  email_masked: string;
  telegram_username: string | null;
  telegram_photo: string | null;
}

export async function v_a41961(v_ab6401): Promise<{ users: SearchUser[] }> {
  return v_bc1b24<{ users: SearchUser[] }>(`/oth-path?q=${encodeURIComponent(v_ab6401)}`);
}

export async function v_6465b2(
  v_389afb,
  v_a8cd21,
): Promise<{ gift_code: string; expires_at: number }> {
  return v_bc1b24(`/oth-path${v_389afb}/gift-link`, {
    method: "POST",
    body: JSON.stringify({ message: v_a8cd21 }),
  });
}

export async function v_dd6147(v_389afb): Promise<{ ok: true }> {
  return v_bc1b24(`/oth-path${v_389afb}/gift-link`, { method: "DELETE" });
}
