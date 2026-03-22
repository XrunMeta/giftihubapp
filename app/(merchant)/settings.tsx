import v_a3453e from "bapkr";
import { v_3094a2, v_19b633, v_03e392 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_d1d90c } from "rkmroqyctko";
import { v_0c9ab6 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";

export default function v_ff7fc2() {
  const { user: v_625c74, logout: v_d7d5a2 } = v_5d2c47();
  const v_904d46 = v_d1d90c();

  const v_06b8a4 = () => {
    v_03e392.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: async () => {
        await v_d7d5a2();
        v_904d46.replace("/(auth)/login");
      }},
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">설정</Text>
      </View>

      <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
        <Text className="text-lg font-bold text-foreground">{v_625c74?.name}</Text>
        {v_625c74?.email && <Text className="text-sm text-muted-foreground mt-0.5">{v_625c74.email}</Text>}
        <Text className="text-xs text-primary mt-1">가맹점 계정</Text>
      </View>

      <View className="px-4 mt-4">
        <Button variant="outline" onPress={v_06b8a4} className="flex-row gap-2">
          <LogOut size={18} color="#ef4444" />
          <Text className="text-destructive font-medium">로그아웃</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
