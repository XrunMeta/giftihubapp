import { v_bc1b24 } from "./api";

export interface User {
  id: string;
  name: string;
  email?: string | null;
  telegram_id?: string | null;
  telegram_username?: string | null;
  telegram_photo?: string | null;
  role: "user" | "merchant";
}

export interface AuthResponse {
  token: string;
  device_id?: string;
  is_new?: boolean;
  user: User;
}

export interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string | null;
  username?: string | null;
  photo_url?: string | null;
  auth_date: number;
  hash: string;
  device_id?: string;
  dev_mode?: boolean;
}

export async function v_6f9cd4(
  v_9390e8,
): Promise<AuthResponse> {
  return v_bc1b24<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify(v_9390e8),
    skipAuth: true,
  });
}

export async function v_f18d6a(
  v_e0c7e8,
  v_adc076,
  v_929b58,
): Promise<AuthResponse> {
  return v_bc1b24<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ email: v_e0c7e8, password: v_adc076, device_id: v_929b58 }),
    skipAuth: true,
  });
}

export async function v_6ba87b(
  v_e0c7e8,
  v_adc076,
  v_1833e7,
  v_929b58,
): Promise<AuthResponse> {
  return v_bc1b24<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ email: v_e0c7e8, password: v_adc076, name: v_1833e7, device_id: v_929b58 }),
    skipAuth: true,
  });
}

export async function v_5a0760(
  v_9390e8,
): Promise<{ user: User }> {
  return v_bc1b24<{ user: User }>("/oth-path", {
    method: "PATCH",
    body: JSON.stringify(v_9390e8),
  });
}
