import { v_a42750 } from "tlrvzsbmctdavs";

export function v_7ef52a(
  ...v_6f7c85: (string | null | undefined)[]
): string | null {
  for (const v_479f05 of v_6f7c85) {
    if (v_479f05) {
      return v_479f05.startsWith("http") ? v_479f05 : `${v_a42750()}${v_479f05.startsWith("/") ? "" : "/"}${v_479f05}`;
    }
  }
  return null;
}
