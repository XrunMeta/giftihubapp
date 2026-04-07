import type { Locale, MessageTree } from "./types";
import { en } from "./en";
import { id } from "./id";
import { ja } from "./ja";
import { ko } from "./ko";
import { zhHans } from "./zhHans";

export const messages: Record<Locale, MessageTree> = {
  ko,
  en,
  id,
  ja,
  "zh-Hans": zhHans,
};

export function resolveMessage(tree: MessageTree, path: string): string {
  const parts = path.split(".");
  let node: unknown = tree;
  for (const p of parts) {
    if (node && typeof node === "object" && p in (node as object)) {
      node = (node as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof node === "string" ? node : path;
}

export type { Locale, MessageTree } from "./types";
export { LOCALE_OPTIONS, DEFAULT_LOCALE, localeToBcp47 } from "./types";
