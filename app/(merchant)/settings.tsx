import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_03e392, v_4623af, v_39a996 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_d1d90c } from "rkmroqyctko";
import { v_0c9ab6 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_bc1b24 } from "tlrvzsbmctdavs";

export default function v_ff7fc2() {
  const { user: v_625c74, logout: v_d7d5a2 } = v_5d2c47();
  const v_904d46 = v_d1d90c();

  type SettlementPolicy = "anytime" | "monthly" | "request_only";
  const v_29551d = [
    { key: "anytime", label: "자유 정산", desc: "관리자가 아무 때나 정산" },
    { key: "monthly", label: "월별 정산", desc: "지난달 내역만 정산" },
    { key: "request_only", label: "요청 정산", desc: "내가 요청한 것만 정산" },
  ];

  const [v_efba22, v_f040e1] = v_5ab095<SettlementPolicy>("anytime");
  const [v_a6d63c, v_81ab8f] = v_5ab095(true);

  v_c4deb2(() => {
    v_bc1b24<{ settlement_policy: string }>("/oth-path")
      .then((v_9390e8) => v_f040e1(v_9390e8.settlement_policy as SettlementPolicy))
      .catch(() => {})
      .finally(() => v_81ab8f(false));
  }, []);

  const v_392585 = async (v_e2a85c) => {
    const v_ba2215 = v_efba22;
    v_f040e1(v_e2a85c);
    try {
      await v_bc1b24("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ settlement_policy: v_e2a85c }),
      });
    } catch { v_f040e1(v_ba2215); }
  };

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

      <View className="mt-6 px-4">
        <Text className="text-base font-semibold text-foreground mb-3">정산 정책</Text>
        {v_a6d63c ? (
          <ActivityIndicator size="small" />
        ) : (
          v_29551d.map((v_68b2be) => (
            <TouchableOpacity
              key={v_68b2be.key}
              onPress={() => v_392585(v_68b2be.key)}
              className={"flex-row items-center p-3 mb-2 rounded-lg border " + (v_efba22 === v_68b2be.key ? "border-primary bg-primary/10" : "border-border")}
            >
              <View className={"w-5 h-5 rounded-full border-2 mr-3 items-center justify-center " + (v_efba22 === v_68b2be.key ? "border-primary" : "border-muted-foreground")}>
                {v_efba22 === v_68b2be.key && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <View>
                <Text className="text-sm font-medium text-foreground">{v_68b2be.label}</Text>
                <Text className="text-xs text-muted-foreground">{v_68b2be.desc}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
