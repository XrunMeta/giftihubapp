import { StyleSheet, Text, TextInput } from "react-native";

export const pretendardFontMap = {
  "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
  "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
  "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
  "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
} as const;

let applied = false;

export function applyPretendardTextDefaults() {
  if (applied) return;
  applied = true;
  const base = { fontFamily: "Pretendard-Regular" };
  const T = Text as any;
  const TI = TextInput as any;
  T.defaultProps = {
    ...T.defaultProps,
    style: StyleSheet.flatten([base, T.defaultProps?.style]),
  };
  TI.defaultProps = {
    ...TI.defaultProps,
    style: StyleSheet.flatten([base, TI.defaultProps?.style]),
  };
}
