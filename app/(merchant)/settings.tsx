import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_d1d90c } from "rkmroqyctko";
import { v_6a6a7c, v_4700cd, v_0c9ab6, v_be6206 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_03e392, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

function v_37c1d6({ icon: v_9ddfab, label: v_2869c1, onPress: v_719eed }: { icon: v_a3453e.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={v_719eed}
      className="flex-row items-center px-4 py-4 bg-card active:bg-muted"
    >
      <View className="mr-3">{v_9ddfab}</View>
      <Text className="flex-1 text-sm text-foreground">{v_2869c1}</Text>
      <ChevronRight size={18} color="#9ca3af" />
    </Pressable>
  );
}

export default function v_ff7fc2() {
  const { t: v_8d41d7 } = v_678659();
  const { user: v_625c74, logout: v_d7d5a2 } = v_5d2c47();
  const v_904d46 = v_d1d90c();

  const v_06b8a4 = () => {
    v_03e392.alert(v_8d41d7("merchant.mSettings.logoutTitle"), v_8d41d7("merchant.mSettings.logoutBody"), [
      { text: v_8d41d7("merchant.mSettings.cancel"), style: "cancel" },
      {
        text: v_8d41d7("merchant.mSettings.logout"), onPress: async () => {
          await v_d7d5a2();
          v_904d46.replace("/(auth)/login");
        }
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.mSettings.title")} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>

        <View className="mx-4 mt-4 bg-card rounded-xl border border-border p-5 mb-6">
          <Text className="text-lg font-bold text-foreground">{v_625c74?.name}</Text>
          {v_625c74?.email && <Text className="text-sm text-muted-foreground mt-0.5">{v_625c74.email}</Text>}
          <Text className="text-xs text-primary mt-1">{v_8d41d7("merchant.mSettings.merchantAccount")}</Text>
        </View>

        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
          <MenuItem
            icon={<Settings2 size={18} color="#6b7280" />}
            label={v_8d41d7("merchant.mSettings.settlementPolicy")}
            onPress={() => v_904d46.push("/(merchant)/settlement-policy")}
          />
          <View className="h-px bg-border mx-4" />
          <MenuItem
            icon={<Globe size={18} color="#6b7280" />}
            label={v_8d41d7("settings.language")}
            onPress={() => v_904d46.push("/(user)/settings")}
          />
        </View>

        <View className="px-4 mt-2">
          <Button variant="outline" onPress={v_06b8a4} className="flex-row gap-2 bg-white">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">{v_8d41d7("merchant.mSettings.logout")}</Text>
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
