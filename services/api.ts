import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_URL = "http://203.0.113.10:8787";
const REMOTE_URL = "https://giftihubapi.pages.dev";
const SERVER_KEY = "gifti_server";

let _baseUrl = __DEV__ ? LOCAL_URL : REMOTE_URL;

export function getBaseUrl(): string { return _baseUrl; }

export const BASE_URL = _baseUrl;

export async function initBaseUrl(): Promise<void> {
  if (!__DEV__) return;
  const saved = await AsyncStorage.getItem(SERVER_KEY);
  if (saved === "remote") _baseUrl = REMOTE_URL;
  else _baseUrl = LOCAL_URL;
}

export async function setServerMode(mode: "local" | "remote"): Promise<void> {
  _baseUrl = mode === "remote" ? REMOTE_URL : LOCAL_URL;
  await AsyncStorage.setItem(SERVER_KEY, mode);
}

export function getServerMode(): "local" | "remote" {
  return _baseUrl === LOCAL_URL ? "local" : "remote";
}

const TOKEN_KEY = "gifti_jwt";
const REMEMBER_KEY = "gifti_remember";
const SAVED_EMAIL_KEY = "gifti_saved_email";

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getRememberMe(): Promise<boolean> {
  const v = await AsyncStorage.getItem(REMEMBER_KEY);
  return v === "true";
}

export async function setRememberMe(value: boolean): Promise<void> {
  await AsyncStorage.setItem(REMEMBER_KEY, value ? "true" : "false");
}

export async function getSavedEmail(): Promise<string | null> {
  return AsyncStorage.getItem(SAVED_EMAIL_KEY);
}

export async function setSavedEmail(email: string): Promise<void> {
  await AsyncStorage.setItem(SAVED_EMAIL_KEY, email);
}

export async function removeSavedEmail(): Promise<void> {
  await AsyncStorage.removeItem(SAVED_EMAIL_KEY);
}

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`API Error ${status}`);
    this.name = "ApiError";
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${_baseUrl}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body);
  }

  return response.json() as Promise<T>;
}
