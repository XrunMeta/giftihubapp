import { getBaseUrl } from "@/services/api";

export function resolveImageUrl(
  ...candidates: (string | null | undefined)[]
): string | null {
  for (const raw of candidates) {
    if (raw) {
      return raw.startsWith("http")
        ? raw
        : `${getBaseUrl()}${raw.startsWith("/") ? "" : "/"}${raw}`;
    }
  }
  return null;
}
