import { apiFetch } from "./api";
import type { User } from "./auth";

export interface VoucherStat {
  status: string;
  count: number;
}

export interface MeResponse {
  user: User & {
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

export async function getMe(): Promise<MeResponse> {
  return apiFetch<MeResponse>("/oth-path");
}

export async function getPurchases(
  params?: PaginationParams & { source?: "store" | "marketplace" | "all" },
): Promise<PaginatedResponse<unknown>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.from) searchParams.set("from", params.from);
  if (params?.to) searchParams.set("to", params.to);
  if (params?.source) searchParams.set("source", params.source);
  const query = searchParams.toString();
  return apiFetch(`/oth-path${query ? `?${query}` : ""}`);
}

export async function getTransfers(
  params?: PaginationParams & { direction?: "sent" | "received" | "all" },
): Promise<PaginatedResponse<unknown>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.direction) searchParams.set("direction", params.direction);
  const query = searchParams.toString();
  return apiFetch(`/oth-path${query ? `?${query}` : ""}`);
}

export async function getPayments(
  params?: PaginationParams & {
    status?: string;
    method?: string;
    type?: string;
  },
): Promise<PaginatedResponse<unknown>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.status) searchParams.set("status", params.status);
  if (params?.method) searchParams.set("method", params.method);
  if (params?.type) searchParams.set("type", params.type);
  const query = searchParams.toString();
  return apiFetch(`/oth-path${query ? `?${query}` : ""}`);
}
