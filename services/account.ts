import { v_bc1b24 } from "./api";
import type { v_1ddb60 } from "./auth";

export interface VoucherStat {
  status: string;
  count: number;
}

export interface MeResponse {
  user: v_1ddb60 & {
    created_at: number;
    updated_at: number;
  };
  voucher_stats: VoucherStat[];
}

interface PaginationParams {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}

interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export async function v_7ef860(): Promise<MeResponse> {
  return v_bc1b24<MeResponse>("/oth-path");
}

export async function v_a4ddab(
  v_24baff,
): Promise<PaginatedResponse<unknown>> {
  const v_a3f1ae = new URLSearchParams();
  if (v_24baff?.page) v_a3f1ae.set("page", String(v_24baff.page));
  if (v_24baff?.limit) v_a3f1ae.set("limit", String(v_24baff.limit));
  if (v_24baff?.from) v_a3f1ae.set("from", v_24baff.from);
  if (v_24baff?.to) v_a3f1ae.set("to", v_24baff.to);
  if (v_24baff?.source) v_a3f1ae.set("source", v_24baff.source);
  const v_7c5791 = v_a3f1ae.toString();
  return v_bc1b24(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ""}`);
}

export async function v_11c36d(
  v_24baff,
): Promise<PaginatedResponse<unknown>> {
  const v_a3f1ae = new URLSearchParams();
  if (v_24baff?.page) v_a3f1ae.set("page", String(v_24baff.page));
  if (v_24baff?.limit) v_a3f1ae.set("limit", String(v_24baff.limit));
  if (v_24baff?.direction) v_a3f1ae.set("direction", v_24baff.direction);
  const v_7c5791 = v_a3f1ae.toString();
  return v_bc1b24(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ""}`);
}

export async function v_9ca048(
  v_24baff,
): Promise<PaginatedResponse<unknown>> {
  const v_a3f1ae = new URLSearchParams();
  if (v_24baff?.page) v_a3f1ae.set("page", String(v_24baff.page));
  if (v_24baff?.limit) v_a3f1ae.set("limit", String(v_24baff.limit));
  if (v_24baff?.status) v_a3f1ae.set("status", v_24baff.status);
  if (v_24baff?.method) v_a3f1ae.set("method", v_24baff.method);
  if (v_24baff?.type) v_a3f1ae.set("type", v_24baff.type);
  const v_7c5791 = v_a3f1ae.toString();
  return v_bc1b24(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ""}`);
}
