import { apiFetch } from "./api";

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

export async function loginWithTelegram(
  data: TelegramAuthData,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

export async function loginWithEmail(
  email: string,
  password: string,
  deviceId?: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ email, password, device_id: deviceId }),
    skipAuth: true,
  });
}

export async function register(
  email: string,
  password: string,
  name: string,
  deviceId?: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/oth-path", {
    method: "POST",
    body: JSON.stringify({ email, password, name, device_id: deviceId }),
    skipAuth: true,
  });
}

export async function updateProfile(
  data: Partial<Pick<User, "name" | "email">>,
): Promise<{ user: User }> {
  return apiFetch<{ user: User }>("/oth-path", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
