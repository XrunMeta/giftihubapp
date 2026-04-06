import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_5e3aed, v_afc1d9, type v_678322 } from "vhkgxwheyyipiczd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_3b9c43, v_a07c02 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import {
  v_39a996,
  v_03e392,
  v_cf9c33,
  v_e767d1,
  v_326be8,
  v_122070,
  v_19b633,
  v_79c4f2,
  v_3094a2,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

const v_6b1440 = { KRW: "₩", USD: "$", IDR: "Rp" };

function v_f89181(v_e6d4a6): string {
  if (!v_e6d4a6) return "";
  return v_e6d4a6.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function v_2b70c8() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const { addToCart: v_7bab4b } = v_7a943b();
  const [v_01bee9, v_2ea5dd] = v_5ab095<v_678322 | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac2689, v_c94a71] = v_5ab095(1);
  const [v_e4a1e9, v_72c7ee] = v_5ab095("");

  v_c4deb2(() => {
    if (v_389afb) v_80ee8f();
  }, [v_389afb]);

  const v_80ee8f = async () => {
    try {
      const v_9390e8 = await v_5e3aed(v_389afb!);
      v_2ea5dd(v_9390e8.product);
    } catch {
      v_03e392.alert("오류", "상품 정보를 불러올 수 없습니다.");
      v_904d46.back();
    } finally {
      v_34a50a(false);
    }
  };

  if (v_683210 || !v_01bee9) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_e567dc = v_01bee9.product_type === "flexible";
  const v_d6ed0e = v_01bee9.flexible_currency ?? "KRW";
  const v_c37780 = v_6b1440[v_d6ed0e] ?? "₩";
  const v_3ae14a =
    !v_e567dc && v_01bee9.price > 0 && v_01bee9.face_value > 0 && v_01bee9.price < v_01bee9.face_value
      ? Math.round((1 - v_01bee9.price / v_01bee9.face_value) * 100)
      : 0;

  const v_43744f = v_e4a1e9 ? Number(v_e4a1e9) : 0;

  const v_df7942 = (v_e1cba1) => {
    if (v_e567dc) {
      const v_74dfb8 = v_43744f;
      if (!v_74dfb8 || v_74dfb8 < (v_01bee9.flexible_min ?? 0) || v_74dfb8 > (v_01bee9.flexible_max ?? 0)) {
        v_03e392.alert(
          "금액 오류",
          `${v_c37780}${(v_01bee9.flexible_min ?? 0).toLocaleString()} ~ ${v_c37780}${(v_01bee9.flexible_max ?? 0).toLocaleString()} 범위에서 입력해주세요.`,
        );
        return;
      }
      v_7bab4b(v_01bee9, 1, v_74dfb8);
    } else {
      v_7bab4b(v_01bee9, v_ac2689);
    }
    if (v_e1cba1) {
      v_904d46.push("/(user)/cart");
    } else {
      v_03e392.alert("장바구니", "장바구니에 추가되었습니다.");
    }
  };

  const v_74f4a3 = v_afc1d9(v_01bee9);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="bg-white border-b border-border">
        <PageHeader title={v_01bee9.brand_name} />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={v_326be8.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
        >
          <View className="bg-white rounded-2xl border border-border overflow-hidden mb-4 py-3">
            {v_74f4a3 ? (
              <Image source={{ uri: v_74f4a3 }} className="w-full h-72 bg-white" resizeMode="contain" />
            ) : (
              <View className="w-full h-56 bg-muted/60 items-center justify-center py-10">
                <Text className="text-5xl">🎁</Text>
                <Text className="text-sm text-muted-foreground mt-3">{v_01bee9.brand_name}</Text>
              </View>
            )}
          </View>

          <View className="bg-white rounded-2xl border border-border p-5">
            <Text className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              {v_01bee9.brand_name}
            </Text>
            <Text className="text-xl font-bold text-foreground  leading-7">{v_01bee9.name}</Text>

            {v_e567dc ? (
              <>
                <View className="mt-4 bg-secondary/80 rounded-xl px-4 py-3">
                  <Text className="text-xs text-muted-foreground">구매 가능 금액</Text>
                  <Text className="text-sm font-semibold text-foreground mt-1">
                    {v_c37780}
                    {(v_01bee9.flexible_min ?? 0).toLocaleString()} ~ {v_c37780}
                    {(v_01bee9.flexible_max ?? 0).toLocaleString()}
                  </Text>
                </View>
                <Text className="text-sm font-medium text-foreground mt-5 mb-2">구매 금액 ({v_d6ed0e})</Text>
                <View className="flex-row items-center bg-secondary rounded-xl border border-border px-4 py-3">
                  <Text className="text-base font-bold text-muted-foreground mr-2">{v_c37780}</Text>
                  <TextInput
                    className="flex-1 text-lg font-semibold text-foreground py-0.5"
                    placeholder={v_f89181(String(v_01bee9.flexible_min ?? 0))}
                    placeholderTextColor="#737373"
                    keyboardType="numeric"
                    value={v_f89181(v_e4a1e9)}
                    onChangeText={(v_8d41d7) => v_72c7ee(v_8d41d7.replace(/\D/g, ""))}
                  />
                </View>
              </>
            ) : (
              <>
                <View className="flex-row items-end justify-between gap-3 mt-4">
                  {v_3ae14a > 0 ? (
                    <>
                      <View className="flex-1 min-w-0">
                        <View className="bg-primary/12 self-start rounded-full ">
                          <Text className="text-sm font-bold text-primary">{v_3ae14a}% 할인</Text>
                        </View>
                        <Text className="text-sm text-muted-foreground line-through">
                          {v_6b1440[v_01bee9.display_currency] ?? "₩"}
                          {(v_01bee9.face_value ?? 0).toLocaleString()}
                        </Text>
                      </View>
                      <Text className="text-2xl font-bold text-foreground shrink-0">
                        {v_6b1440[v_01bee9.display_currency] ?? "₩"}
                        {(v_01bee9.price ?? 0).toLocaleString()}
                      </Text>
                    </>
                  ) : (
                    <Text className="text-2xl font-bold text-foreground">
                      {v_6b1440[v_01bee9.display_currency] ?? "₩"}
                      {(v_01bee9.price ?? 0).toLocaleString()}
                    </Text>
                  )}
                </View>

                <Text className="text-sm font-medium text-foreground mt-8 mb-3">수량</Text>
                <View className="flex-row items-center self-start bg-secondary rounded-xl border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl rounded-r-none"
                    onPress={() => v_c94a71(Math.max(1, v_ac2689 - 1))}
                  >
                    <Minus size={18} color="#0a0a0a" />
                  </Button>
                  <Text className="text-base font-semibold min-w-[44px] text-center text-foreground">
                    {v_ac2689}
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl rounded-l-none"
                    onPress={() => v_c94a71(v_ac2689 + 1)}
                  >
                    <Plus size={18} color="#0a0a0a" />
                  </Button>
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <View className="flex-row gap-3 bg-white border-t border-border px-4 py-4">
          <Button variant="outline" className="flex-1 border-border bg-gray-50" onPress={() => v_df7942(false)}>
            장바구니
          </Button>
          <Button className="flex-1" onPress={() => v_df7942(true)}>
            구매하기
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
