import "../global.css";
import { v_6e1a2d, v_742f47, v_373784 } from "ixigazcpvfldbecwtbvavtbi";
import { v_cb3606 } from "rkmroqyctko";
import { v_b5df25 } from "ernurodqvmtspux";
import { v_70c669 } from "zwwvjiopxcaovigclhtwpklelhlr";
import "cfbddvpdeqahlratrsgwvpe";

import { v_09cf67 } from "phitcagrdzdrioxlolaqafvw";
import { v_78c062 } from "jbfshypwcrklpetczcsca";
import { v_f931fd } from "dxfmfnfvriitbtghyppor";

export default function v_5d2b63() {
  const v_1f35a2 = v_09cf67();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={v_1f35a2 === "dark" ? v_6e1a2d : v_742f47}>
        <AuthProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(user)" />
              <Stack.Screen name="(merchant)" />
            </Stack>
          </CartProvider>
        </AuthProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
