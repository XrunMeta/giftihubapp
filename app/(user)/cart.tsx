import v_a3453e from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_cf9c33, v_03e392 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_3b9c43, v_a07c02, v_1290fc, v_c62079, v_d55cb2 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7a943b, type v_42580b, type v_3d1605 } from "dxfmfnfvriitbtghyppor";
import { v_e81ec9 } from "vhkgxwheyyipiczd";

const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };

function v_be1e41(v_f63e09, v_a832b3) {
  const v_c37780 = v_928ad6[v_a832b3 ?? "KRW"] ?? "₩";
  return `${v_c37780}${v_f63e09.toLocaleString()}`;
}

export default function v_d218af() {
  const v_904d46 = v_d1d90c();
  const {
    items: v_4622b9, packageItems: v_5be600,
    updateQuantity: v_3fe605, removeFromCart: v_af112b, removePackage: v_dbcdf7,
    getTotalPrice: v_e60156, getCartCount: v_63e412,
  } = v_7a943b();

  const v_4ccc1a = v_4622b9.length > 0 || v_5be600.length > 0;

  const v_6897aa = () => {
    if (!v_5be600.length) return null;
    return (
      <View className="mb-2">
        {v_5be600.map((v_e42213, v_e86ad8) => {
          const v_6839b8 = v_e42213.items[0];
          const v_7e0009 = v_e42213.items.reduce((v_fd5f43, v_ebec57) => v_fd5f43 + v_ebec57.quantity, 0) - (v_6839b8?.quantity ?? 0);
          const v_2869c1 = v_6839b8
            ? `${v_6839b8.product.name}${v_7e0009 > 0 ? ` 외 ${v_7e0009}건` : ""}`
            : "구성 상품";

          return (
            <View key={`pkg-${v_e86ad8}`} className="bg-card rounded-xl border border-border p-3 mx-4 mb-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2 flex-1">
                  <View className="w-10 h-10 rounded-lg bg-primary/10 items-center justify-center">
                    <Package size={20} color="#CE3630" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-primary font-semibold">구성 상품</Text>
                    <Text className="text-sm text-foreground" numberOfLines={1}>{v_2869c1}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <Text className="text-sm font-bold text-foreground">
                    {v_be1e41(v_e42213.totalBudget, v_e42213.currency)}
                  </Text>
                  <Pressable onPress={() => v_dbcdf7(v_e86ad8)}>
                    <X size={16} color="#ef4444" />
                  </Pressable>
                </View>
              </View>

              {}
              <View className="mt-2 pt-2 border-t border-border">
                {v_e42213.items.map((v_9f8c39, v_0266e7) => (
                  <View key={v_0266e7} className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                      {v_9f8c39.product.brand_name} · {v_9f8c39.product.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      x{v_9f8c39.quantity}
                    </Text>
                  </View>
                ))}
                {v_e42213.composition?.flexible_item && (
                  <View className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-amber-500 flex-1">
                      제휴상품권 · {v_e42213.composition.flexible_item.name}
                    </Text>
                    <Text className="text-xs text-amber-500">
                      {v_be1e41(v_e42213.composition.flexible_item.flexible_amount, v_e42213.currency)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: v_42580b }) => {
    const v_74f4a3 = v_e81ec9(v_8c0b26.product);
    return (
      <View className="flex-row bg-card rounded-xl border border-border p-3 mx-4 mb-3">
        {v_74f4a3 ? (
          <Image
            source={{ uri: v_74f4a3 }}
            className="w-20 h-20 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-20 h-20 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text className="text-xs text-muted-foreground">{v_8c0b26.product.brand_name}</Text>
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
              {v_8c0b26.product.name}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            {v_8c0b26.flexibleAmount ? (
              <Text className="text-xs text-amber-500">금액 지정</Text>
            ) : (
              <View className="flex-row items-center border border-border rounded-md">
                <Pressable
                  onPress={() => v_3fe605(v_8c0b26.cartId!, v_8c0b26.quantity - 1)}
                  className="p-1.5"
                >
                  <Minus size={14} color="#737373" />
                </Pressable>
                <Text className="text-sm font-medium w-8 text-center text-foreground">
                  {v_8c0b26.quantity}
                </Text>
                <Pressable
                  onPress={() => v_3fe605(v_8c0b26.cartId!, v_8c0b26.quantity + 1)}
                  className="p-1.5"
                >
                  <Plus size={14} color="#737373" />
                </Pressable>
              </View>
            )}
            <View className="flex-row items-center gap-3">
              <Text className="text-sm font-bold text-foreground">
                {v_8c0b26.flexibleAmount
                  ? v_be1e41(v_8c0b26.flexibleAmount, v_8c0b26.product.flexible_currency ?? "KRW")
                  : `₩${(v_8c0b26.product.price * v_8c0b26.quantity).toLocaleString()}`}
              </Text>
              <Pressable onPress={() => v_af112b(v_8c0b26.cartId!)}>
                <Trash2 size={16} color="#ef4444" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">장바구니</Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={v_4622b9}
        renderItem={v_fcf6ec}
        keyExtractor={(v_8c0b26) => v_8c0b26.cartId ?? v_8c0b26.product.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={v_6897aa()}
        ListEmptyComponent={
          !v_5be600.length ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">장바구니가 비어있습니다.</Text>
            </View>
          ) : null
        }
      />

      {v_4ccc1a && (() => {

        const v_d1b52c = {};
        for (const v_e42213 of v_5be600) {
          v_d1b52c[v_e42213.currency] = (v_d1b52c[v_e42213.currency] ?? 0) + v_e42213.totalBudget;
        }
        for (const v_8c0b26 of v_4622b9) {
          if (v_8c0b26.flexibleAmount) {
            const v_3b170c = v_8c0b26.product.flexible_currency ?? "KRW";
            v_d1b52c[v_3b170c] = (v_d1b52c[v_3b170c] ?? 0) + v_8c0b26.flexibleAmount;
          } else {
            v_d1b52c["KRW"] = (v_d1b52c["KRW"] ?? 0) + v_8c0b26.product.price * v_8c0b26.quantity;
          }
        }

        const v_1c3e83 = Object.keys(v_d1b52c).sort((v_779914, v_148ff6) => {
          const v_5e4f30 = ["USD", "KRW", "IDR"];
          return (v_5e4f30.indexOf(v_779914) === -1 ? 99 : v_5e4f30.indexOf(v_779914)) - (v_5e4f30.indexOf(v_148ff6) === -1 ? 99 : v_5e4f30.indexOf(v_148ff6));
        });
        const v_3aa565 = v_1c3e83.length > 1;

        const v_de7a9a = () => {
          if (v_3aa565) {
            const v_3d694a = v_1c3e83.map((v_3f4e2e) => ({
              text: `${v_3f4e2e} ${v_928ad6[v_3f4e2e]}${v_d1b52c[v_3f4e2e].toLocaleString()}`,
              onPress: () => v_904d46.push({ pathname: "/(user)/purchase", params: { currency: v_3f4e2e } }),
            }));
            v_3d694a.push({ text: "취소", onPress: () => {} });
            v_03e392.alert("결제할 통화 선택", "한 번에 하나의 통화만 결제할 수 있습니다.", v_3d694a);
          } else {
            v_904d46.push({ pathname: "/(user)/purchase", params: { currency: v_1c3e83[0] } });
          }
        };

        return (
          <View className="px-5 py-4 border-t border-border">
            {v_3aa565 ? (
              <View className="mb-3">
                <Text className="text-xs text-muted-foreground mb-1">통화별 ({v_1c3e83.length}건)</Text>
                {v_1c3e83.map((v_3f4e2e) => (
                  <View key={v_3f4e2e} className="flex-row justify-between py-0.5">
                    <Text className="text-sm text-foreground">{v_3f4e2e}</Text>
                    <Text className="text-sm font-bold text-foreground">
                      {v_928ad6[v_3f4e2e] ?? ""}{v_d1b52c[v_3f4e2e].toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="flex-row justify-between mb-3">
                <Text className="text-base text-foreground">합계 ({v_63e412()}개)</Text>
                <Text className="text-xl font-bold text-foreground">
                  {v_928ad6[v_1c3e83[0]] ?? "₩"}{(v_d1b52c[v_1c3e83[0]] ?? 0).toLocaleString()}
                </Text>
              </View>
            )}
            <Button onPress={v_de7a9a}>
              결제하기
            </Button>
          </View>
        );
      })()}
    </SafeAreaView>
  );
}
