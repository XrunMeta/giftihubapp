export type Locale = "ko" | "en" | "id" | "ja" | "zh-Hans";

export type MessageTree = { [key: string]: string | MessageTree };

export const LOCALE_OPTIONS: { code: Locale; nativeName: string }[] = [
  { code: "ko", nativeName: "한국어" },
  { code: "en", nativeName: "English" },
  { code: "id", nativeName: "Bahasa Indonesia" },
  { code: "ja", nativeName: "日本語" },
  { code: "zh-Hans", nativeName: "简体中文" },
];

export const DEFAULT_LOCALE: Locale = "ko";

export function localeToBcp47(locale: Locale): string {
  switch (locale) {
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
