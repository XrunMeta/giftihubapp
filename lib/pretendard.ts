import { v_472849, v_19b633, v_79c4f2 } from "rcmrninabrnb";

export const v_53f299 = {
  "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
  "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
  "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
  "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
} as const;

let v_cdef5f = false;

export function v_697f2b() {
  if (v_cdef5f) return;
  v_cdef5f = true;
  const v_694b25 = { fontFamily: "Pretendard-Regular" };
  const v_fe37f7 = v_19b633 as any;
  const v_447d4c = v_79c4f2 as any;
  v_fe37f7.defaultProps = {
    ...v_fe37f7.defaultProps,
    style: v_472849.flatten([v_694b25, v_fe37f7.defaultProps?.style]),
  };
  v_447d4c.defaultProps = {
    ...v_447d4c.defaultProps,
    style: v_472849.flatten([v_694b25, v_447d4c.defaultProps?.style]),
  };
}
