import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import { v_3ebb07 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

type SettlementPolicy = "anytime" | "monthly" | "request_only";

const v_29551d = [
  { key: "anytime", labelKey: "merchant.mSettings.policyAnytime", descKey: "merchant.mSettings.policyAnytimeDesc" },
  { key: "monthly", labelKey: "merchant.mSettings.policyMonthly", descKey: "merchant.mSettings.policyMonthlyDesc" },
  { key: "request_only", labelKey: "merchant.mSettings.policyRequest", descKey: "merchant.mSettings.policyRequestDesc" },
];

export default function v_117b6e() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const [v_efba22, v_f040e1] = v_5ab095<SettlementPolicy>("anytime");
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    v_bc1b24<{ settlement_policy: string }>("/oth-path")
      .then((v_9390e8) => v_f040e1(v_9390e8.settlement_policy as SettlementPolicy))
      .catch(() => {})
      .finally(() => v_34a50a(false));
  }, []);

  const v_392585 = async (v_e2a85c) => {
    const v_ba2215 = v_efba22;
    v_f040e1(v_e2a85c);
    try {
      await v_bc1b24("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ settlement_policy: v_e2a85c }),
      });
      v_904d46.back();
    } catch {
      v_f040e1(v_ba2215);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.mSettings.settlementPolicy")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 24 }}>
        {v_683210 ? (
          <ActivityIndicator size="small" className="mt-8" />
        ) : (
          <View className="bg-card rounded-xl border border-border overflow-hidden">
            {v_29551d.map((v_68b2be, v_a56041) => {
              const v_587413 = v_efba22 === v_68b2be.key;
              return (
                <View key={v_68b2be.key}>
                  {v_a56041 > 0 ? <View className="h-px bg-border mx-4" /> : null}
                  <Pressable
                    className={`flex-row items-center justify-between px-4 py-4 ${v_587413 ? "bg-primary/5" : ""}`}
                    onPress={() => v_392585(v_68b2be.key)}
                  >
                    <View className="flex-1 mr-3">
                      <Text className={`text-sm font-medium ${v_587413 ? "text-primary" : "text-foreground"}`}>
                        {v_8d41d7(v_68b2be.labelKey)}
                      </Text>
                      <Text className="text-xs text-muted-foreground mt-0.5">{v_8d41d7(v_68b2be.descKey)}</Text>
                    </View>
                    {v_587413 ? <Check size={20} color="#CE3630" /> : null}
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
