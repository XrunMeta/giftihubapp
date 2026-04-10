

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Alert, type AlertButton } from "react-native";

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

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const toast = useCallback<DialogContextValue["toast"]>(
    (message, variantOrOptions) => {
      let title: string | undefined;
      if (variantOrOptions && typeof variantOrOptions !== "string") {
        title = variantOrOptions.title;
      }
      Alert.alert(title ?? "알림", message);
    },
    [],
  );

  const confirm = useCallback<DialogContextValue["confirm"]>((options) => {
    return new Promise<number>((resolve) => {
      const buttons: ConfirmButton[] = options.buttons ?? [
        { text: "취소", style: "cancel" },
        { text: "확인", style: options.destructive ? "destructive" : "default" },
      ];

      let settled = false;
      const nativeButtons: AlertButton[] = buttons.map((b, idx) => ({
        text: b.text,
        style: b.style ?? "default",
        onPress: () => {
          if (settled) return;
          settled = true;
          resolve(idx);
        },
      }));

      Alert.alert(options.title ?? "", options.message, nativeButtons, {
        cancelable: true,
        onDismiss: () => {
          if (settled) return;
          settled = true;
          resolve(-1);
        },
      });
    });
  }, []);

  const alert = useCallback<DialogContextValue["alert"]>(
    (message, title) =>
      new Promise<void>((resolve) => {
        Alert.alert(title ?? "알림", message, [
          { text: "확인", style: "default", onPress: () => resolve() },
        ]);
      }),
    [],
  );

  const value = useMemo<DialogContextValue>(
    () => ({ toast, confirm, alert }),
    [toast, confirm, alert],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export function useDialog(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return ctx;
}
