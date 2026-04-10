import { apiFetch } from "./api";

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

export async function getMyVouchers(
  status?: VoucherStatus,
  keyword?: number,
): Promise<{ vouchers: Voucher[] }> {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (keyword) params.set("keyword", String(keyword));
  const query = params.toString();
  return apiFetch<{ vouchers: Voucher[] }>(`/oth-path${query ? `?${query}` : ""}`);
}

export async function getVoucherDetail(
  id: string,
): Promise<{ voucher: Voucher }> {
  return apiFetch<{ voucher: Voucher }>(`/oth-path${id}`);
}

export async function getVoucherBarcode(
  id: string,
): Promise<{ barcode: string; expires_in: number }> {
  return apiFetch<{ barcode: string; expires_in: number }>(
    `/oth-path${id}/barcode`,
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

export async function getSetDetail(setId: string): Promise<SetDetail> {
  return apiFetch<SetDetail>(`/oth-path${setId}`);
}

export async function transferVoucher(
  id: string,
  recipientId: string,
): Promise<{ ok: true; transfer_count: number }> {
  return apiFetch(`/oth-path${id}/transfer`, {
    method: "POST",
    body: JSON.stringify({ recipient_id: recipientId }),
  });
}

export async function giftVoucher(
  id: string,
  telegramId: string,
): Promise<{ ok: true; fee: number }> {
  return apiFetch(`/oth-path${id}/gift`, {
    method: "POST",
    body: JSON.stringify({ telegram_id: telegramId }),
  });
}

export async function useVoucher(
  id: string,
): Promise<{ ok: true }> {
  return apiFetch(`/oth-path${id}/use`, {
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

export async function searchUsers(q: string): Promise<{ users: SearchUser[] }> {
  return apiFetch<{ users: SearchUser[] }>(`/oth-path?q=${encodeURIComponent(q)}`);
}

export async function createGiftLink(
  id: string,
  message?: string,
): Promise<{ gift_code: string; expires_at: number }> {
  return apiFetch(`/oth-path${id}/gift-link`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export async function cancelGiftLink(id: string): Promise<{ ok: true }> {
  return apiFetch(`/oth-path${id}/gift-link`, { method: "DELETE" });
}
