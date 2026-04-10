

import { useCallback } from "react";
import { Alert, type AlertButton } from "react-native";

type AlertBtnStyle = "default" | "cancel" | "destructive";
type AlertBtn = { text: string; onPress?: () => void; style?: AlertBtnStyle };

export function useAlertShim() {
  return useCallback(
    (title: string, message?: string, buttons?: AlertBtn[]) => {
      const nativeButtons: AlertButton[] | undefined = buttons?.map((b) => ({
        text: b.text,
        onPress: b.onPress,
        style: b.style ?? "default",
      }));
      Alert.alert(title, message, nativeButtons);
    },
    [],
  );
}
