export type Locale = "ko" | "en" | "id" | "ja" | "zh-Hans";

export type MessageTree = { [key: string]: string | MessageTree };

export const v_48dd6f = [
  { code: "ko", nativeName: "한국어" },
  { code: "en", nativeName: "English" },
  { code: "id", nativeName: "Bahasa Indonesia" },
  { code: "ja", nativeName: "日本語" },
  { code: "zh-Hans", nativeName: "简体中文" },
];

export const v_f9db6d = "ko";

export function v_58169c(v_6f298b): string {
  switch (v_6f298b) {
    case "zh-Hans":
      return "zh-CN";
    case "en":
      return "en-US";
    case "id":
      return "id-ID";
    case "ja":
      return "ja-JP";
    default:
      return "ko-KR";
  }
}
