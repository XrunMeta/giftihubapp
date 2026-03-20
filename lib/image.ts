import { BASE_URL } from "@/services/api";

export function resolveImageUrl(
  ...candidates: (string | null | undefined)[]
): string | null {
  for (const raw of candidates) {
    if (raw) {
      return raw.startsWith("http") ? raw : `${BASE_URL}${raw}`;
    }
  }
  return null;
}
