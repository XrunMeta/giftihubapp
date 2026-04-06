import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_7ef860, type v_44083e } from "eqrxxpgqjbwbqqqhvy";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import { v_6a6a7c, v_d84748, v_1c7574, v_0c9ab6, v_5dcc4b } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_5ab095 } from "bapkr";
import { v_39a996, v_03e392, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_840f8f() {
  const v_904d46 = v_d1d90c();
  const { user: v_625c74, logout: v_d7d5a2 } = v_5d2c47();
  const [v_b32680, v_ee70ba] = v_5ab095<v_44083e | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_cf763b(
    v_de06a3(() => {
      v_3fb498();
    }, [])
  );

  const v_3fb498 = async () => {
    try {
      const v_9390e8 = await v_7ef860();
      v_ee70ba(v_9390e8);
    } catch {

    } finally {
      v_34a50a(false);
    }
  };

  const v_06b8a4 = () => {
    v_03e392.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃", onPress: async () => {
          await v_d7d5a2();
          v_904d46.replace("/(auth)/login");
        }
      },
    ]);
  };

  if (v_683210) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_727031 = v_b32680?.user || v_625c74;
  const v_62676b = v_b32680?.voucher_stats || [];
  const v_2ba0d1 = v_62676b.find((v_fd5f43) => v_fd5f43.status === "active")?.count || 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScreenHeader elevated title="MY" />
      <ScrollView className="flex-1">
        {}
        <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
          <Text className="text-lg font-bold text-foreground">{v_727031?.name}</Text>
          {v_727031?.email && (
            <Text className="text-sm text-muted-foreground mt-0.5">{v_727031.email}</Text>
          )}
          {v_727031?.telegram_username && (
            <Text className="text-sm text-muted-foreground">@{v_727031.telegram_username}</Text>
          )}
          <View className="flex-row mt-4 gap-6">
            <View>
              <Text className="text-2xl font-bold text-primary">{v_2ba0d1}</Text>
              <Text className="text-xs text-muted-foreground">보유 기프티</Text>
            </View>
          </View>
        </View>

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<History size={20} color="#737373" />}
            label="구매 이력"
            onPress={() => v_904d46.push("/(user)/settlement")}
          />
          <Separator />
          <MenuItem
            icon={<CreditCard size={20} color="#737373" />}
            label="결제 내역"
            onPress={() => v_904d46.push("/(user)/settlement")}
          />
          <Separator />
          <MenuItem
            icon={<Settings size={20} color="#737373" />}
            label="설정"
            onPress={() => { }}
          />
        </View>

        <View className="px-4 mt-6 mb-8">
          <Button variant="outline" onPress={v_06b8a4} className="flex-row gap-2 bg-white">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">로그아웃</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function v_37c1d6({
  icon: v_9ddfab,
  label: v_2869c1,
  onPress: v_719eed,
}: {
  icon: v_a3453e.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="flex-row items-center justify-between px-4 py-6"
      onPress={v_719eed}
    >
      <View className="flex-row items-center gap-3">
        {v_9ddfab}
        <Text className="text-base text-foreground">{v_2869c1}</Text>
      </View>
      <ChevronRight size={18} color="#737373" />
    </Pressable>
  );
}
