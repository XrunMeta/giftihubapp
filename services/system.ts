import { apiFetch } from "./api";

export async function getDevMode(): Promise<boolean> {
  const res = await apiFetch<{ dev_mode: boolean }>("/oth-path", {
    skipAuth: true,
  });
  return res.dev_mode;
}
