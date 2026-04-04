import "../global.css";
import { v_c4deb2 } from "bapkr";
import { v_6e1a2d, v_742f47, v_373784 } from "ixigazcpvfldbecwtbvavtbi";
import { v_cb3606 } from "rkmroqyctko";
import { v_b5df25 } from "ernurodqvmtspux";
import { v_70c669 } from "zwwvjiopxcaovigclhtwpklelhlr";
import "cfbddvpdeqahlratrsgwvpe";

import { v_09cf67 } from "phitcagrdzdrioxlolaqafvw";
import { v_78c062 } from "jbfshypwcrklpetczcsca";
import { v_f931fd } from "dxfmfnfvriitbtghyppor";
import { v_72e65b, v_e76876 } from "wplnrzxbcvjvxjmndcjr";
import { v_f219f7 } from "tlrvzsbmctdavs";

export default function v_5d2b63() {
  const v_1f35a2 = v_09cf67();
  const v_36b75f = v_e76876();

  v_c4deb2(() => { v_f219f7(); }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={v_1f35a2 === "dark" ? v_6e1a2d : v_742f47}>
        <DevModeContext.Provider value={v_36b75f}>
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
        </DevModeContext.Provider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
