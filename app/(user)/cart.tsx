import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_15e817, v_e300c4, v_7a943b, type v_42580b } from "dxfmfnfvriitbtghyppor";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_e81ec9 } from "vhkgxwheyyipiczd";
import { v_d1d90c } from "rkmroqyctko";
import { v_3ebb07, v_3b9c43, v_c62079, v_a07c02, v_1290fc, v_d55cb2 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_9cabcb, v_cf9c33, v_09d0e5, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };

function v_be1e41(v_f63e09, v_a832b3) {
  const v_c37780 = v_928ad6[v_a832b3 ?? "KRW"] ?? "₩";
  return `${v_c37780}${v_f63e09.toLocaleString()}`;
}

export default function v_d218af() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const v_904d46 = v_d1d90c();
  const {
    items: v_4622b9, packageItems: v_5be600,
    updateQuantity: v_3fe605, removeFromCart: v_af112b, removePackage: v_dbcdf7,
    getTotalPrice: v_e60156, getCartCount: v_63e412,
    selectedItemIds: v_6e7be8, selectedPackageIds: v_942cd6,
    toggleItemSelected: v_445291, togglePackageSelected: v_13681b, setAllSelected: v_171edc,
    isItemSelected: v_096296, isPackageSelected: v_686526,
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
            ? `${v_6839b8.product.name}${v_7e0009 > 0 ? ` ${v_8d41d7("myGifti.list.restItems").replace("{{count}}", String(v_7e0009))}` : ""}`
            : v_8d41d7("userCart.fallbackName");

          const v_1e0a1e = v_e42213.id ? v_686526(v_e42213.id) : false;
          return (
            <View key={`pkg-${v_e86ad8}`} className="bg-card rounded-xl border border-border p-3 mx-4 mb-3">
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => v_e42213.id && v_13681b(v_e42213.id)}
                  className={`w-6 h-6 rounded-md border items-center justify-center mr-2 ${v_1e0a1e ? "bg-primary border-primary" : "border-border"}`}
                >
                  {v_1e0a1e && <Check size={14} color="#fff" />}
                </Pressable>
                <View className="flex-row items-center gap-2 flex-1">
                  <View className="w-10 h-10 rounded-lg bg-primary/10 items-center justify-center">
                    <Package size={20} color="#CE3630" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-primary font-semibold">{v_8d41d7("userCart.bundleTag")}</Text>
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
                      {v_8d41d7("userStore.bundle.flexibleVoucher")} · {v_e42213.composition.flexible_item.name}
                    </Text>
                    <Text className="text-sm text-amber-500">
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
    const v_587413 = v_8c0b26.cartId ? v_096296(v_8c0b26.cartId) : false;
    return (
      <View className="flex-row items-center bg-card rounded-xl border border-border p-3 mx-4 mb-3">
        <Pressable
          onPress={() => v_8c0b26.cartId && v_445291(v_8c0b26.cartId)}
          className={`w-6 h-6 rounded-md border items-center justify-center mr-2 ${v_587413 ? "bg-primary border-primary" : "border-border"}`}
        >
          {v_587413 && <Check size={14} color="#fff" />}
        </Pressable>
        {v_74f4a3 ? (
          <Image
            source={{ uri: v_74f4a3 }}
            className="w-20 h-20 rounded-lg"
            resizeMode="contain"
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
              <Text className="text-xs text-amber-500">{v_8d41d7("userCart.customAmount")}</Text>
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
              <Text className="text-md font-bold text-foreground">
                {v_be1e41(
                  v_e300c4(v_8c0b26) * (v_8c0b26.flexibleAmount ? 1 : v_8c0b26.quantity),
                  v_15e817(v_8c0b26),
                )}
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
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("userCart.title")} />

      <FlatList
        style={{ flex: 1 }}
        data={v_4622b9}
        renderItem={v_fcf6ec}
        keyExtractor={(v_8c0b26) => v_8c0b26.cartId ?? v_8c0b26.product.id}
        ListHeaderComponent={v_6897aa()}
        ListEmptyComponent={
          !v_5be600.length ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("userCart.empty")}</Text>
            </View>
          ) : null
        }
      />

      {v_4ccc1a && (() => {

        const v_d1b52c = {};
        for (const v_e42213 of v_5be600) {
          if (!v_e42213.id || !v_942cd6.has(v_e42213.id)) continue;
          v_d1b52c[v_e42213.currency] = (v_d1b52c[v_e42213.currency] ?? 0) + v_e42213.totalBudget;
        }
        for (const v_8c0b26 of v_4622b9) {
          if (!v_8c0b26.cartId || !v_6e7be8.has(v_8c0b26.cartId)) continue;
          const v_c3bc75 = v_15e817(v_8c0b26);
          const v_74dfb8 = v_8c0b26.flexibleAmount ? v_8c0b26.flexibleAmount : v_8c0b26.product.price * v_8c0b26.quantity;
          v_d1b52c[v_c3bc75] = (v_d1b52c[v_c3bc75] ?? 0) + v_74dfb8;
        }
        const v_a75897 = v_6e7be8.size + v_942cd6.size;

        const v_1c3e83 = Object.keys(v_d1b52c).sort((v_779914, v_148ff6) => {
          const v_5e4f30 = ["USD", "KRW", "IDR"];
          return (v_5e4f30.indexOf(v_779914) === -1 ? 99 : v_5e4f30.indexOf(v_779914)) - (v_5e4f30.indexOf(v_148ff6) === -1 ? 99 : v_5e4f30.indexOf(v_148ff6));
        });
        const v_3aa565 = v_1c3e83.length > 1;

        const v_de7a9a = () => {
          if (v_a75897 === 0) {
            v_5c50c0(v_8d41d7("userCart.pickCurrencyTitle"), v_8d41d7("userCart.empty"));
            return;
          }
          if (v_3aa565) {
            const v_3d694a = v_1c3e83.map((v_3f4e2e) => ({
              text: `${v_3f4e2e} ${v_928ad6[v_3f4e2e]}${v_d1b52c[v_3f4e2e].toLocaleString()}`,
              onPress: () => v_904d46.push({ pathname: "/(user)/purchase", params: { currency: v_3f4e2e } }),
            }));
            v_3d694a.push({ text: v_8d41d7("userCart.cancel"), onPress: () => { } });
            v_5c50c0(v_8d41d7("userCart.pickCurrencyTitle"), v_8d41d7("userCart.pickCurrencyBody"), v_3d694a);
          } else {
            v_904d46.push({ pathname: "/(user)/purchase", params: { currency: v_1c3e83[0] } });
          }
        };

        return (
          <View className="px-5 py-4 border-t border-border bg-white">
            {v_3aa565 ? (
              <View className="mb-3">
                <Text className="text-xs text-muted-foreground mb-1">
                  {v_8d41d7("userCart.byCurrency").replace("{{count}}", String(v_1c3e83.length))}
                </Text>
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
                <Text className="text-base text-foreground">
                  {v_8d41d7("userCart.totalLine").replace("{{count}}", String(v_63e412()))}
                </Text>
                <Text className="text-xl font-bold text-foreground">
                  {v_928ad6[v_1c3e83[0]] ?? "₩"}{(v_d1b52c[v_1c3e83[0]] ?? 0).toLocaleString()}
                </Text>
              </View>
            )}
            <Button onPress={v_de7a9a}>
              {v_8d41d7("userCart.checkout")}
            </Button>
          </View>
        );
      })()}
    </SafeAreaView>
  );
}
