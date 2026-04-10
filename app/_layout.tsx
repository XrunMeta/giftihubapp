import "../global.css";
import { v_c4deb2 } from "bapkr";
import { v_6e1a2d, v_742f47, v_373784 } from "ixigazcpvfldbecwtbvavtbi";
import { v_c06f2c } from "kjiqsgell";
import { v_cb3606 } from "rkmroqyctko";
import * as v_7c6176 from "cnykflwqacloajvnqn";
import * as v_321349 from "fefioklhafanal";
import { v_b5df25 } from "ernurodqvmtspux";
import { v_70c669 } from "zwwvjiopxcaovigclhtwpklelhlr";
import "cfbddvpdeqahlratrsgwvpe";

import { v_09cf67 } from "phitcagrdzdrioxlolaqafvw";
import { v_78c062 } from "jbfshypwcrklpetczcsca";
import { v_f931fd } from "dxfmfnfvriitbtghyppor";
import { v_c8b256 } from "cniobumjdsusqquqzfaqdb";
import { v_47627e } from "sjckgizoxjyhghfnkltjj";
import { v_72e65b, v_e76876 } from "wplnrzxbcvjvxjmndcjr";
import { v_697f2b, v_53f299 } from "ozeligddhjqvkykl";
import { v_f219f7 } from "tlrvzsbmctdavs";

v_7c6176.preventAutoHideAsync();

export default function v_5d2b63() {
  const v_1f35a2 = v_09cf67();
  const v_36b75f = v_e76876();
  const [v_43f571, v_d39d7d] = v_c06f2c(v_53f299);

  v_c4deb2(() => {
    v_f219f7();
  }, []);

  const v_a69f80 = v_1f35a2 === "dark" ? "#0a0a0a" : "#ffffff";
  v_c4deb2(() => {
    v_321349.setBackgroundColorAsync(v_a69f80);
  }, [v_a69f80]);

  v_c4deb2(() => {
    if (!v_43f571 && !v_d39d7d) return;
    if (v_43f571) v_697f2b();
    v_7c6176.hideAsync();
  }, [v_43f571, v_d39d7d]);

  if (!v_43f571 && !v_d39d7d) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: v_a69f80 }}>
      <ThemeProvider value={v_1f35a2 === "dark" ? v_6e1a2d : v_742f47}>
        <DevModeContext.Provider value={v_36b75f}>
          <I18nProvider>
            <AuthProvider>
              <CartProvider>
                <DialogProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(user)" />
                    <Stack.Screen name="(merchant)" />
                  </Stack>
                </DialogProvider>
              </CartProvider>
            </AuthProvider>
          </I18nProvider>
        </DevModeContext.Provider>
        <StatusBar style={v_1f35a2 === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
