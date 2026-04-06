import type { v_fe10f7, v_8695c5 } from "./types";
import { v_5d6728 } from "./en";
import { v_389afb } from "./id";
import { v_062521 } from "./ja";
import { v_04a966 } from "./ko";
import { v_d3750f } from "./zhHans";

export const messages: Record<v_fe10f7, v_8695c5> = {
  ko: v_04a966,
  en: v_5d6728,
  id: v_389afb,
  ja: v_062521,
  "zh-Hans": v_d3750f,
};

export function v_efa1d0(tree: v_8695c5, v_9fe22d): string {
  const v_468545 = v_9fe22d.split(".");
  let v_aab306 = v_5f60ba;
  for (const v_e2a85c of v_468545) {
    if (v_aab306 && typeof v_aab306 === "object" && v_e2a85c in (v_aab306 as object)) {
      v_aab306 = (v_aab306 as Record<string, unknown>)[v_e2a85c];
    } else {
      return v_9fe22d;
    }
  }
  return typeof v_aab306 === "string" ? v_aab306 : v_9fe22d;
}

export type { v_fe10f7, v_8695c5 } from "./types";
export { LOCALE_OPTIONS, DEFAULT_LOCALE, localeToBcp47 } from "./types";
