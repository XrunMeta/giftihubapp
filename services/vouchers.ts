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
}

export type VoucherStatus =
  | "active"
  | "used"
  | "expired"
  | "transferred"
  | "listed";

export async function v_720509(
  v_d308b5,
): Promise<{ vouchers: Voucher[] }> {
  const v_7c5791 = v_d308b5 ? `?status=${v_d308b5}` : "";
  return v_bc1b24<{ vouchers: Voucher[] }>(`/oth-path${v_7c5791}`);
}

export async function v_50a647(
  v_389afb,
): Promise<Voucher> {
  return v_bc1b24<Voucher>(`/oth-path${v_389afb}`);
}

export async function v_eaee10(
  v_389afb,
): Promise<{ barcode: string; expires_in: number }> {
  return v_bc1b24<{ barcode: string; expires_in: number }>(
    `/oth-path${v_389afb}/barcode`,
  );
}

export async function v_2b01b0(
  v_389afb,
  v_1af2e1,
): Promise<{ ok: true; transfer_count: number }> {
  return v_bc1b24(`/oth-path${v_389afb}/transfer`, {
    method: "POST",
    body: JSON.stringify({ recipient_email: v_1af2e1 }),
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
