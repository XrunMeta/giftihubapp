

import { v_de06a3 } from "bapkr";
import { v_03e392, type v_2ce1ff } from "rcmrninabrnb";

type AlertBtnStyle = "default" | "cancel" | "destructive";
type AlertBtn = { text: string; onPress?: () => void; style?: AlertBtnStyle };

export function v_2bd2c5() {
  return v_de06a3(
    (v_9f1622, v_a8cd21, v_3d694a) => {
      const nativeButtons: v_2ce1ff[] | undefined = v_3d694a?.map((v_148ff6) => ({
        text: v_148ff6.text,
        onPress: v_148ff6.onPress,
        style: v_148ff6.style ?? "default",
      }));
      v_03e392.alert(v_9f1622, v_a8cd21, v_7f59de);
    },
    [],
  );
}
