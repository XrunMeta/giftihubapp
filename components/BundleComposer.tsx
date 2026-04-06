import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_7ef52a } from "splenmyqnym";
import { v_664ac3, type v_47aa8c } from "uugztyivrmtvweuio";
import { v_c62079, v_6b9090 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_39a996, v_03e392, v_cf9c33, v_09d0e5, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";

const v_78e25d = ["KRW", "USD", "IDR"] as const;
const v_165211 = { KRW: "₩", USD: "$", IDR: "Rp" };
const v_054e7a = {
  KRW: "50000",
  USD: "50",
  IDR: "500000",
};

function v_f89181(v_e6d4a6): string {
  if (!v_e6d4a6) return "";
  return v_e6d4a6.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function v_4c40b6() {
  const { addPackageToCart: v_81ab78 } = v_7a943b();
  const [v_f63e09, v_1cbe59] = v_5ab095("");
  const [v_a832b3, v_b84a73] = v_5ab095<string>("KRW");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_247d1d, v_ee239b] = v_5ab095<v_47aa8c | null>(null);

  const v_f780c3 = async () => {
    const v_0ad8c5 = Number(v_f63e09);
    if (!v_0ad8c5 || v_0ad8c5 <= 0) {
      v_03e392.alert("금액 오류", "올바른 금액을 입력해주세요.");
      return;
    }
    v_34a50a(true);
    v_ee239b(null);
    try {
      const v_8f00b9 = await v_664ac3(v_0ad8c5, v_a832b3);
      v_ee239b(v_8f00b9.composition);
    } catch (v_49263d) {
      v_03e392.alert("구성 실패", v_49263d.body?.error || v_49263d.message || "상품을 구성할 수 없습니다.");
    } finally {
      v_34a50a(false);
    }
  };

  const v_9e50cf = () => {
    if (!v_247d1d) return;
    const v_4622b9 = v_247d1d.items.map((v_8c0b26) => ({
      product: {
        id: v_8c0b26.storage_id,
        brand_slug: v_8c0b26.brand_slug,
        brand_name: v_8c0b26.brand_name,
        brand_logo: null,
        name: v_8c0b26.name,
        face_value: v_8c0b26.face_value,
        face_value_usd: v_8c0b26.face_value_usd,
        price: v_8c0b26.face_value,
        price_usd: v_8c0b26.face_value_usd,
        display_currency: v_8c0b26.display_currency,
        image_url: v_8c0b26.image_url,
        thumb_url: v_8c0b26.thumb_url,
        stock_count: null,
        total_issued: 0,
        status: "active",
        product_type: "fixed" as const,
        flexible_currency: null,
        flexible_min: null,
        flexible_max: null,
      },
      quantity: v_8c0b26.quantity,
    }));

    v_81ab78({
      items: v_4622b9,
      totalBudget: v_247d1d.total,
      currency: v_247d1d.currency,
      composition: v_247d1d,
    });

    v_03e392.alert("장바구니 추가", "구성 상품이 장바구니에 담겼습니다.");
    v_ee239b(null);
    v_1cbe59("");
  };

  const v_c37780 = v_165211[v_a832b3] ?? "";

  return (
    <View className="mx-1.5 mb-4">
      <View className="bg-card rounded-xl border border-border p-4">
        <View className="flex-row items-center gap-2 mb-3">
          <Package size={18} color="#CE3630" />
          <Text className="text-base font-bold text-foreground">구성 구매</Text>
        </View>

        <Text className="text-sm text-muted-foreground mb-2">
          금액을 입력하면 최적의 상품 조합을 만들어 드립니다.
        </Text>

        {}
        <View className="flex-row gap-2 mb-3">
          {v_78e25d.map((v_3f4e2e) => (
            <Pressable
              key={v_3f4e2e}
              onPress={() => { v_b84a73(v_3f4e2e); v_ee239b(null); }}
              className={`flex-1 py-3  rounded-lg border items-center ${v_a832b3 === v_3f4e2e
                ? "bg-primary border-primary"
                : "bg-secondary border-border"
                }`}
            >
              <Text
                className={`text-sm font-semibold ${v_a832b3 === v_3f4e2e ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
              >
                {v_3f4e2e}
              </Text>
            </Pressable>
          ))}
        </View>

        {}
        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-secondary rounded-lg px-3 border border-border">
            <Text className="text-md text-muted-foreground mr-1">{v_c37780}</Text>
            <TextInput
              className="flex-1 py-2.5 text-md text-foreground"
              placeholder={v_f89181(v_054e7a[v_a832b3])}
              placeholderTextColor="#737373"
              keyboardType="numeric"
              value={v_f89181(v_f63e09)}
              onChangeText={(v_9b6134) => v_1cbe59(v_9b6134.replace(/\D/g, ""))}
            />
          </View>
          <Button
            onPress={v_f780c3}
            disabled={v_683210 || !v_f63e09}
            className="px-4"
          >
            {v_683210 ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-sm font-semibold text-primary-foreground">구성하기</Text>
            )}
          </Button>
        </View>
      </View>

      {}
      {v_247d1d && (
        <View className="bg-card rounded-xl border border-border p-4 mt-2">
          <Text className="text-sm font-bold text-foreground mb-3">
            구성 결과
          </Text>

          {v_247d1d.items.map((v_8c0b26, v_e86ad8) => {
            const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url);
            return (
              <View key={v_e86ad8} className="flex-row items-center py-2 border-b border-border">
                {v_74f4a3 ? (
                  <Image source={{ uri: v_74f4a3 }} className="w-10 h-10 rounded-md mr-3" resizeMode="contain" />
                ) : (
                  <View className="w-10 h-10 rounded-md bg-muted items-center justify-center mr-3">
                    <Text className="text-lg">🎁</Text>
                  </View>
                )}
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground">{v_8c0b26.brand_name}</Text>
                  <Text className="text-sm text-foreground" numberOfLines={1}>{v_8c0b26.name}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm text-muted-foreground">x{v_8c0b26.quantity}</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {v_c37780}{v_8c0b26.subtotal.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })}

          {v_247d1d.flexible_item && (
            <View className="flex-row items-center py-2 border-b border-border">
              <View className="w-10 h-10 rounded-md bg-amber-900/30 items-center justify-center mr-3">
                <Text className="text-lg">💳</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm text-amber-500">제휴상품권</Text>
                <Text className="text-sm text-foreground">{v_247d1d.flexible_item.name}</Text>
              </View>
              <Text className="text-sm font-semibold text-foreground">
                {v_c37780}{v_247d1d.flexible_item.flexible_amount.toLocaleString()}
              </Text>
            </View>
          )}

          {}
          <View className="flex-row justify-between items-center mt-3 pt-2">
            <Text className="text-sm text-muted-foreground">
              합계 ({v_247d1d.items.length + (v_247d1d.flexible_item ? 1 : 0)}종)
            </Text>
            <Text className="text-lg font-bold text-foreground">
              {v_c37780}{v_247d1d.total.toLocaleString()}
            </Text>
          </View>

          {v_247d1d.overshoot > 0 && (
            <Text className="text-sm text-amber-500 mt-1">
              목표 대비 +{v_c37780}{v_247d1d.overshoot.toLocaleString()} 초과
            </Text>
          )}

          <Button className="mt-3 flex-row gap-2" onPress={v_9e50cf}>
            <ShoppingCart size={16} color="#fff" />
            <Text className="text-sm font-semibold text-primary-foreground">장바구니에 담기</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
