import { v_c4deb2 } from "bapkr";
import { v_3094a2, v_39a996 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";

export default function v_53e1da() {
  const { isAuthenticated: v_c55bb9, isLoading: v_cd31a8, user: v_625c74 } = v_5d2c47();
  const v_904d46 = v_d1d90c();

  v_c4deb2(() => {
    if (v_cd31a8) return;

    if (!v_c55bb9) {
      v_904d46.replace("/(auth)/login");
    } else if (v_625c74?.role === "merchant") {
      v_904d46.replace("/(merchant)");
    } else {
      v_904d46.replace("/(user)/store");
    }
  }, [v_c55bb9, v_cd31a8, v_625c74]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#CE3630" />
    </View>
  );
}
