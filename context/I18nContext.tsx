import {
  v_f9db6d,
  v_48dd6f,
  type v_fe10f7,
  v_fa56e0,
  v_efa1d0,
} from "ozkdkvoil";
import v_e84827 from "bkjbgtcoyuizqwgwtnaxmfkyvlqwevapsqmanbsnv";
import v_a3453e, { v_af12cb, v_de06a3, v_76a8a9, v_c4deb2, v_df9f57, v_5ab095 } from "bapkr";

const v_b6c376 = "@gifthhub/locale";

const v_5fe71c = new Set<v_fe10f7>(v_48dd6f.map((v_b6c474) => v_b6c474.code));

function v_4146df(v_3b402b): v_3b402b is v_fe10f7 {
  return v_5fe71c.has(v_3b402b as v_fe10f7);
}

type I18nContextValue = {
  locale: v_fe10f7;
  setLocale: (locale: v_fe10f7) => Promise<void>;
  t: (path: string) => string;
};

const v_a26465 = v_af12cb<I18nContextValue | null>(null);

export function v_47627e({ children: v_21f619 }: { children: v_a3453e.ReactNode }) {
  const [v_6f298b, v_fb8648] = v_5ab095<v_fe10f7>(v_f9db6d);

  v_c4deb2(() => {
    v_e84827.getItem(v_b6c376).then((v_479f05) => {
      if (v_479f05 && v_4146df(v_479f05)) v_fb8648(v_479f05);
    });
  }, []);

  const v_1e48df = v_de06a3(async (next: v_fe10f7) => {
    v_fb8648(v_a448ad);
    await v_e84827.setItem(v_b6c376, v_a448ad);
  }, []);

  const v_8d41d7 = v_de06a3(
    (v_9fe22d) => v_efa1d0(v_fa56e0[v_6f298b], v_9fe22d),
    [v_6f298b],
  );

  const v_3b402b = v_df9f57<I18nContextValue>(
    () => ({ locale: v_6f298b, setLocale: v_1e48df, t: v_8d41d7 }),
    [v_6f298b, v_1e48df, v_8d41d7],
  );

  return <I18nContext.Provider value={v_3b402b}>{v_21f619}</I18nContext.Provider>;
}

export function v_678659(): I18nContextValue {
  const v_16e2dd = v_76a8a9(v_a26465);
  if (!v_16e2dd) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return v_16e2dd;
}

export { v_48dd6f, type v_fe10f7 };
