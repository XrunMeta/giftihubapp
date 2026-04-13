import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_d1d90c } from "rkmroqyctko";
import { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_cf9c33, v_19b633, v_3094a2 } from "rcmrninabrnb";

export default function v_53e1da() {
  const { isAuthenticated: v_c55bb9, isLoading: v_cd31a8, user: v_625c74 } = v_5d2c47();
  const v_904d46 = v_d1d90c();
  const [v_853cbb, v_ef2b8e] = v_5ab095(true);

  v_c4deb2(() => {
    const v_cb36b1 = setTimeout(() => v_ef2b8e(false), 3000);
    return () => clearTimeout(v_cb36b1);
  }, []);

  v_c4deb2(() => {
    if (v_853cbb || v_cd31a8) return;

    if (!v_c55bb9) {
      v_904d46.replace("/(auth)/login");
    } else if (v_625c74?.role === "merchant") {
      v_904d46.replace("/(merchant)");
    } else {
      v_904d46.replace("/(user)/store");
    }
  }, [v_853cbb, v_c55bb9, v_cd31a8, v_625c74]);

  if (v_853cbb) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Image
          source={require("../assets/images/splash-icon.png")}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />
        <View className="mt-8 items-center">
          <Text className="text-xs text-gray-400">특허 제10-1205894호</Text>
          <Text className="text-xs text-gray-400 mt-1">특허 제10-0561546호</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <ActivityIndicator size="large" color="#D33932" />
    </View>
  );
}
