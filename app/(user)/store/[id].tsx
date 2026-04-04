import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_cf9c33, v_122070, v_39a996, v_03e392, v_79c4f2 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_3b9c43, v_a07c02 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_5e3aed, v_afc1d9, type v_678322, type v_575fb7 } from "vhkgxwheyyipiczd";

const v_6b1440 = { KRW: "₩", USD: "$", IDR: "Rp" };

export default function v_2b70c8() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const { addToCart: v_7bab4b } = v_7a943b();
  const [v_01bee9, v_2ea5dd] = v_5ab095<v_678322 | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac2689, v_c94a71] = v_5ab095(1);
  const [v_302506, v_415e6d] = v_5ab095("");

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
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
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

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title={v_01bee9.brand_name} />
      <ScrollView className="flex-1">
        {v_afc1d9(v_01bee9) ? (
          <Image
            source={{ uri: v_afc1d9(v_01bee9)! }}
            className="w-full h-64"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-muted items-center justify-center">
            <Text className="text-4xl">🎁</Text>
            <Text className="text-muted-foreground mt-2">{v_01bee9.brand_name}</Text>
          </View>
        )}
        <View className="px-5 py-4">
          <Text className="text-xs text-muted-foreground">{v_01bee9.brand_name}</Text>
          <Text className="text-xl font-bold text-foreground mt-1">{v_01bee9.name}</Text>

          {v_e567dc ? (
            <>
              <View className="mt-3">
                <Text className="text-sm text-muted-foreground">
                  {v_c37780}{(v_01bee9.flexible_min ?? 0).toLocaleString()} ~ {v_c37780}{(v_01bee9.flexible_max ?? 0).toLocaleString()} 범위에서 입력
                </Text>
              </View>
              <View className="mt-4">
                <Text className="text-sm font-medium text-foreground mb-2">구매 금액 ({v_d6ed0e})</Text>
                <View className="flex-row items-center border border-border rounded-lg px-3 py-2">
                  <Text className="text-lg font-bold text-muted-foreground mr-1">{v_c37780}</Text>
                  <TextInput
                    className="flex-1 text-lg font-bold text-foreground"
                    placeholder={`${(v_01bee9.flexible_min ?? 0).toLocaleString()}`}
                    keyboardType="numeric"
                    value={v_302506}
                    onChangeText={v_415e6d}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View className="flex-row items-baseline mt-3 gap-2">
                {v_3ae14a > 0 && (
                  <Text className="text-lg font-bold text-primary">{v_3ae14a}%</Text>
                )}
                <Text className="text-2xl font-bold text-foreground">
                  {v_6b1440[v_01bee9.display_currency] ?? "₩"}{(v_01bee9.price ?? 0).toLocaleString()}
                </Text>
                {v_3ae14a > 0 && (
                  <Text className="text-sm text-muted-foreground line-through">
                    {v_6b1440[v_01bee9.display_currency] ?? "₩"}{(v_01bee9.face_value ?? 0).toLocaleString()}
                  </Text>
                )}
              </View>
              <View className="flex-row items-center mt-6 gap-4">
                <Text className="text-sm text-foreground">수량</Text>
                <View className="flex-row items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => v_c94a71(Math.max(1, v_ac2689 - 1))}
                  >
                    <Minus size={16} color="#0a0a0a" />
                  </Button>
                  <Text className="text-base font-medium w-10 text-center text-foreground">
                    {v_ac2689}
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => v_c94a71(v_ac2689 + 1)}
                  >
                    <Plus size={16} color="#0a0a0a" />
                  </Button>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className="flex-row gap-3 px-5 py-4 border-t border-border">
        <Button
          variant="outline"
          className="flex-1"
          onPress={() => {
            if (v_e567dc) {
              const v_74dfb8 = Number(v_302506);
              if (!v_74dfb8 || v_74dfb8 < (v_01bee9.flexible_min ?? 0) || v_74dfb8 > (v_01bee9.flexible_max ?? 0)) {
                v_03e392.alert("금액 오류", `${v_c37780}${(v_01bee9.flexible_min ?? 0).toLocaleString()} ~ ${v_c37780}${(v_01bee9.flexible_max ?? 0).toLocaleString()} 범위에서 입력해주세요.`);
                return;
              }
              v_7bab4b(v_01bee9, 1, v_74dfb8);
            } else {
              v_7bab4b(v_01bee9, v_ac2689);
            }
            v_03e392.alert("장바구니", "장바구니에 추가되었습니다.");
          }}
        >
          장바구니
        </Button>
        <Button
          className="flex-1"
          onPress={() => {
            if (v_e567dc) {
              const v_74dfb8 = Number(v_302506);
              if (!v_74dfb8 || v_74dfb8 < (v_01bee9.flexible_min ?? 0) || v_74dfb8 > (v_01bee9.flexible_max ?? 0)) {
                v_03e392.alert("금액 오류", `${v_c37780}${(v_01bee9.flexible_min ?? 0).toLocaleString()} ~ ${v_c37780}${(v_01bee9.flexible_max ?? 0).toLocaleString()} 범위에서 입력해주세요.`);
                return;
              }
              v_7bab4b(v_01bee9, 1, v_74dfb8);
            } else {
              v_7bab4b(v_01bee9, v_ac2689);
            }
            v_904d46.push("/(user)/cart");
          }}
        >
          구매하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
