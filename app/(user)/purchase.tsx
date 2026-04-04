import v_a3453e, { v_5ab095, v_c4deb2 } from "bapkr";
import { v_3094a2, v_19b633, v_09d0e5, v_03e392 } from "rcmrninabrnb";
import { v_d1d90c, v_d1a7ac } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_d84748, v_82416d, v_1a7837, v_27dabc } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_8d53e7 } from "tdwgovnkpylnjynsp";
import type { v_88a3f9 } from "vhkgxwheyyipiczd";

const BASE_PAYMENT_METHODS: { key: v_88a3f9; label: string; icon: v_a3453e.ReactNode; devOnly?: boolean }[] = [
  { key: "dev_pay", label: "개발페이", icon: <Zap size={20} color="#3b82f6" />, devOnly: true },
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };

export default function v_0035e1() {
  const v_904d46 = v_d1d90c();
  const { currency: v_a832b3 } = v_d1a7ac<{ currency?: string }>();
  const { items: v_4622b9, packageItems: v_5be600 } = v_7a943b();
  const [v_587413, v_2122dd] = v_5ab095<v_88a3f9 | null>(null);
  const [v_36b75f, v_f99445] = v_5ab095(false);

  v_c4deb2(() => {
    v_8d53e7().then(v_f99445).catch(() => {});
  }, []);

  const v_b6afde = v_5f78bd.filter((v_35f85c) => !v_35f85c.devOnly || v_36b75f);

  const v_6e2788 = v_a832b3 || "KRW";
  const v_40812c = v_5be600
    .filter((v_e2a85c) => v_e2a85c.currency === v_6e2788)
    .reduce((v_fd5f43, v_e2a85c) => v_fd5f43 + v_e2a85c.totalBudget, 0);

  const v_a3d7a5 = v_4622b9.filter((v_ebec57) => {
    if (v_ebec57.flexibleAmount) return (v_ebec57.product.flexible_currency ?? "KRW") === v_6e2788;
    return v_6e2788 === "KRW";
  });
  const v_0f1165 = v_a3d7a5.reduce((v_fd5f43, v_ebec57) => {
    if (v_ebec57.flexibleAmount) return v_fd5f43 + v_ebec57.flexibleAmount;
    return v_fd5f43 + v_ebec57.product.price * v_ebec57.quantity;
  }, 0);
  const v_59c1f2 = v_40812c + v_0f1165;
  const v_ccd7bf = v_5be600.filter((v_e2a85c) => v_e2a85c.currency === v_6e2788).length
    + v_a3d7a5.length;

  const v_411018 = () => {
    if (!v_587413) {
      v_03e392.alert("선택 필요", "결제 수단을 선택해주세요.");
      return;
    }
    v_904d46.push({
      pathname: "/(user)/payment-process",
      params: { method: v_587413, currency: v_6e2788 },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title={`${v_6e2788} 결제`} />
      <View className="flex-1 px-5">
        <View className="bg-card rounded-xl border border-border p-4 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-sm text-muted-foreground">상품 수</Text>
            <Text className="text-sm font-medium text-foreground">{v_ccd7bf}개</Text>
          </View>
          <Separator className="my-3" />
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-foreground">결제 금액</Text>
            <Text className="text-xl font-bold text-primary">
              {v_928ad6[v_6e2788] ?? ""}{v_59c1f2.toLocaleString()}
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
