import v_a3453e, { v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_09d0e5, v_03e392 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_d84748, v_82416d, v_1a7837 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import type { v_88a3f9 } from "vhkgxwheyyipiczd";

const PAYMENT_METHODS: { key: v_88a3f9; label: string; icon: v_a3453e.ReactNode }[] = [
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

export default function v_0035e1() {
  const v_904d46 = v_d1d90c();
  const { getTotalPrice: v_e60156, getCartCount: v_63e412 } = v_7a943b();
  const [v_587413, v_2122dd] = v_5ab095<v_88a3f9 | null>(null);

  const v_411018 = () => {
    if (!v_587413) {
      v_03e392.alert("선택 필요", "결제 수단을 선택해주세요.");
      return;
    }
    v_904d46.push({
      pathname: "/(user)/payment-process",
      params: { method: v_587413 },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="결제" />
      <View className="flex-1 px-5">
        <View className="bg-card rounded-xl border border-border p-4 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-sm text-muted-foreground">상품 수</Text>
            <Text className="text-sm font-medium text-foreground">{v_63e412()}개</Text>
          </View>
          <Separator className="my-3" />
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-foreground">결제 금액</Text>
            <Text className="text-xl font-bold text-primary">
              ₩{v_e60156().toLocaleString()}
            </Text>
          </View>
        </View>

        <Text className="text-base font-semibold text-foreground mb-3">결제 수단</Text>
        <View className="gap-2">
          {v_b6afde.map((v_3d656b) => (
            <Pressable
              key={v_3d656b.key}
              className={`flex-row items-center p-4 rounded-xl border ${
                v_587413 === v_3d656b.key ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
              onPress={() => v_2122dd(v_3d656b.key)}
            >
              {v_3d656b.icon}
              <Text className="text-base text-foreground ml-3 flex-1">{v_3d656b.label}</Text>
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  v_587413 === v_3d656b.key ? "border-primary bg-primary" : "border-border"
                }`}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View className="px-5 py-4 border-t border-border">
        <Button onPress={v_411018} disabled={!v_587413}>
          결제하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
