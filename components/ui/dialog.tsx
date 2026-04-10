

import v_a3453e, { v_af12cb, v_de06a3, v_76a8a9, v_df9f57 } from "bapkr";
import { v_03e392, type v_2ce1ff } from "rcmrninabrnb";

type ToastVariant = "info" | "success" | "error";

type ConfirmButton = {
  text: string;
  style?: "default" | "cancel" | "destructive";
  value?: boolean;
};

type ConfirmOptions = {
  title?: string;
  message?: string;
  buttons?: ConfirmButton[];
  destructive?: boolean;
};

type ToastOptions = {
  title?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type DialogContextValue = {
  toast: (
    message: string,
    variantOrOptions?: ToastVariant | ToastOptions,
    durationMs?: number,
  ) => void;

  confirm: (options: ConfirmOptions) => Promise<number>;

  alert: (message: string, title?: string) => Promise<void>;
};

const v_b9cd3f = v_af12cb<DialogContextValue | null>(null);

export function v_c8b256({ children: v_21f619 }: { children: v_a3453e.ReactNode }) {
  const v_da74fa = v_de06a3<DialogContextValue["toast"]>(
    (v_a8cd21, v_a7e0e8) => {
      let v_9f1622;
      if (v_a7e0e8 && typeof v_a7e0e8 !== "string") {
        v_9f1622 = v_a7e0e8.title;
      }
      v_03e392.alert(v_9f1622 ?? "알림", v_a8cd21);
    },
    [],
  );

  const v_ce9295 = v_de06a3<DialogContextValue["confirm"]>((v_b36f96) => {
    return new Promise<number>((v_6f7712) => {
      const v_3d694a = v_b36f96.buttons ?? [
        { text: "취소", style: "cancel" },
        { text: "확인", style: v_b36f96.destructive ? "destructive" : "default" },
      ];

      let v_35db80 = false;
      const nativeButtons: v_2ce1ff[] = v_3d694a.map((v_148ff6, v_e86ad8) => ({
        text: v_148ff6.text,
        style: v_148ff6.style ?? "default",
        onPress: () => {
          if (v_35db80) return;
          v_35db80 = true;
          v_6f7712(v_e86ad8);
        },
      }));

      v_03e392.alert(v_b36f96.title ?? "", v_b36f96.message, v_7f59de, {
        cancelable: true,
        onDismiss: () => {
          if (v_35db80) return;
          v_35db80 = true;
          v_6f7712(-1);
        },
      });
    });
  }, []);

  const v_5c50c0 = v_de06a3<DialogContextValue["alert"]>(
    (v_a8cd21, v_9f1622) =>
      new Promise<void>((v_6f7712) => {
        v_03e392.alert(v_9f1622 ?? "알림", v_a8cd21, [
          { text: "확인", style: "default", onPress: () => v_6f7712() },
        ]);
      }),
    [],
  );

  const v_3b402b = v_df9f57<DialogContextValue>(
    () => ({ toast: v_da74fa, confirm: v_ce9295, alert: v_5c50c0 }),
    [v_da74fa, v_ce9295, v_5c50c0],
  );

  return <DialogContext.Provider value={v_3b402b}>{v_21f619}</DialogContext.Provider>;
}

export function v_602e32(): DialogContextValue {
  const v_16e2dd = v_76a8a9(v_b9cd3f);
  if (!v_16e2dd) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return v_16e2dd;
}
