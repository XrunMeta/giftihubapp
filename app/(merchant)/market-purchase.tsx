import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_37e5b4 } from "vkhyfothlklikcpovbqirr";
import type { v_88a3f9 } from "vhkgxwheyyipiczd";
import { v_8d53e7 } from "tdwgovnkpylnjynsp";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import { v_82416d, v_1a7837, v_d84748, v_27dabc } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_03e392, v_09d0e5, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

const BASE_METHODS: { key: v_88a3f9; label: string; icon: v_a3453e.ReactNode; devOnly?: boolean }[] = [
  { key: "dev_pay", label: "개발페이", icon: <Zap size={20} color="#3b82f6" />, devOnly: true },
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

export default function v_ffc71e() {
  const { listingId: v_4b65e3 } = v_d1a7ac<{ listingId: string }>();
  const v_904d46 = v_d1d90c();
  const [v_587413, v_2122dd] = v_5ab095<v_88a3f9 | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_36b75f, v_f99445] = v_5ab095(false);

  v_c4deb2(() => {
    v_8d53e7().then(v_f99445).catch(() => { });
  }, []);

  const v_e4fad8 = v_c57f55.filter((v_35f85c) => !v_35f85c.devOnly || v_36b75f);

  const v_dfaad1 = async () => {
    if (!v_587413 || !v_4b65e3) return;
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_37e5b4(v_4b65e3, v_587413);
      if (v_587413 === "dev_pay" || v_8f00b9.payment_method === "dev_pay") {
        v_03e392.alert("구매 완료", "구매가 완료되었습니다.", [
          { text: "확인", onPress: () => v_904d46.replace("/(merchant)/my-bundles") },
        ]);
        return;
      }
      if (v_8f00b9.redirect_url) {
        await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
      }
      v_03e392.alert("결제 진행", "결제가 진행됩니다.", [
        { text: "확인", onPress: () => v_904d46.replace("/(merchant)/my-bundles") },
      ]);
    } catch (v_49263d) {
      v_03e392.alert("결제 실패", v_49263d.body?.error || "다시 시도해주세요.");
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title="결제" />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-base font-semibold text-foreground mb-3">결제 수단</Text>
        <View className="gap-2">
          {v_e4fad8.map((v_35f85c) => (
            <Pressable
              key={v_35f85c.key}
              className={`flex-row items-center p-4 rounded-xl border ${v_587413 === v_35f85c.key ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              onPress={() => v_2122dd(v_35f85c.key)}
            >
              {v_35f85c.icon}
              <Text className="text-base text-foreground ml-3 flex-1">{v_35f85c.label}</Text>
              <View
                className={`w-5 h-5 rounded-full border-2 ${v_587413 === v_35f85c.key ? "border-primary bg-primary" : "border-border"
                  }`}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <View className="px-5 py-3 border-t border-border">
        <Button onPress={v_dfaad1} disabled={!v_587413 || v_683210}>
          {v_683210 ? "결제 중..." : "결제하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
