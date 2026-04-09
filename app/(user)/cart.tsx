import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { getItemCurrency, getItemUnitPrice, useCart, type CartItem } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { getProductImageUrl } from "@/services/store";
import { useRouter } from "expo-router";
import { Check, Minus, Package, Plus, Trash2, X } from "lucide-react-native";
import React from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };

function formatPrice(amount: number, currency?: string) {
  const sym = SYM[currency ?? "KRW"] ?? "₩";
  return `${sym}${amount.toLocaleString()}`;
}

export default function CartScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const {
    items, packageItems,
    updateQuantity, removeFromCart, removePackage,
    getTotalPrice, getCartCount,
    selectedItemIds, selectedPackageIds,
    toggleItemSelected, togglePackageSelected, setAllSelected,
    isItemSelected, isPackageSelected,
  } = useCart();

  const hasItems = items.length > 0 || packageItems.length > 0;

  const renderPackages = () => {
    if (!packageItems.length) return null;
    return (
      <View className="mb-2">
        {packageItems.map((pkg, idx) => {
          const firstItem = pkg.items[0];
          const restCount = pkg.items.reduce((s, i) => s + i.quantity, 0) - (firstItem?.quantity ?? 0);
          const label = firstItem
            ? `${firstItem.product.name}${restCount > 0 ? ` ${t("myGifti.list.restItems").replace("{{count}}", String(restCount))}` : ""}`
            : t("userCart.fallbackName");

          const pkgSelected = pkg.id ? isPackageSelected(pkg.id) : false;
          return (
            <View key={`pkg-${idx}`} className="bg-card rounded-xl border border-border p-3 mx-4 mb-3">
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => pkg.id && togglePackageSelected(pkg.id)}
                  className={`w-6 h-6 rounded-md border items-center justify-center mr-2 ${pkgSelected ? "bg-primary border-primary" : "border-border"}`}
                >
                  {pkgSelected && <Check size={14} color="#fff" />}
                </Pressable>
                <View className="flex-row items-center gap-2 flex-1">
                  <View className="w-10 h-10 rounded-lg bg-primary/10 items-center justify-center">
                    <Package size={20} color="#CE3630" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-primary font-semibold">{t("userCart.bundleTag")}</Text>
                    <Text className="text-sm text-foreground" numberOfLines={1}>{label}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <Text className="text-sm font-bold text-foreground">
                    {formatPrice(pkg.totalBudget, pkg.currency)}
                  </Text>
                  <Pressable onPress={() => removePackage(idx)}>
                    <X size={16} color="#ef4444" />
                  </Pressable>
                </View>
              </View>

              {}
              <View className="mt-2 pt-2 border-t border-border">
                {pkg.items.map((ci, ciIdx) => (
                  <View key={ciIdx} className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                      {ci.product.brand_name} · {ci.product.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      x{ci.quantity}
                    </Text>
                  </View>
                ))}
                {pkg.composition?.flexible_item && (
                  <View className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-amber-500 flex-1">
                      {t("userStore.bundle.flexibleVoucher")} · {pkg.composition.flexible_item.name}
                    </Text>
                    <Text className="text-sm text-amber-500">
                      {formatPrice(pkg.composition.flexible_item.flexible_amount, pkg.currency)}
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

  const renderItem = ({ item }: { item: CartItem }) => {
    const imgUri = getProductImageUrl(item.product);
    const selected = item.cartId ? isItemSelected(item.cartId) : false;
    return (
      <View className="flex-row items-center bg-card rounded-xl border border-border p-3 mx-4 mb-3">
        <Pressable
          onPress={() => item.cartId && toggleItemSelected(item.cartId)}
          className={`w-6 h-6 rounded-md border items-center justify-center mr-2 ${selected ? "bg-primary border-primary" : "border-border"}`}
        >
          {selected && <Check size={14} color="#fff" />}
        </Pressable>
        {imgUri ? (
          <Image
            source={{ uri: imgUri }}
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
            <Text className="text-xs text-muted-foreground">{item.product.brand_name}</Text>
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
              {item.product.name}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            {item.flexibleAmount ? (
              <Text className="text-xs text-amber-500">{t("userCart.customAmount")}</Text>
            ) : (
              <View className="flex-row items-center border border-border rounded-md">
                <Pressable
                  onPress={() => updateQuantity(item.cartId!, item.quantity - 1)}
                  className="p-1.5"
                >
                  <Minus size={14} color="#737373" />
                </Pressable>
                <Text className="text-sm font-medium w-8 text-center text-foreground">
                  {item.quantity}
                </Text>
                <Pressable
                  onPress={() => updateQuantity(item.cartId!, item.quantity + 1)}
                  className="p-1.5"
                >
                  <Plus size={14} color="#737373" />
                </Pressable>
              </View>
            )}
            <View className="flex-row items-center gap-3">
              <Text className="text-md font-bold text-foreground">
                {formatPrice(
                  getItemUnitPrice(item) * (item.flexibleAmount ? 1 : item.quantity),
                  getItemCurrency(item),
                )}
              </Text>
              <Pressable onPress={() => removeFromCart(item.cartId!)}>
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
      <ScreenHeader elevated title={t("userCart.title")} />

      <FlatList
        style={{ flex: 1 }}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.cartId ?? item.product.id}
        ListHeaderComponent={renderPackages()}
        ListEmptyComponent={
          !packageItems.length ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{t("userCart.empty")}</Text>
            </View>
          ) : null
        }
      />

      {hasItems && (() => {

        const currTotals: Record<string, number> = {};
        for (const pkg of packageItems) {
          if (!pkg.id || !selectedPackageIds.has(pkg.id)) continue;
          currTotals[pkg.currency] = (currTotals[pkg.currency] ?? 0) + pkg.totalBudget;
        }
        for (const item of items) {
          if (!item.cartId || !selectedItemIds.has(item.cartId)) continue;
          const cur = getItemCurrency(item);
          const amt = item.flexibleAmount ? item.flexibleAmount : item.product.price * item.quantity;
          currTotals[cur] = (currTotals[cur] ?? 0) + amt;
        }
        const selectedCount = selectedItemIds.size + selectedPackageIds.size;

        const currencies = Object.keys(currTotals).sort((a, b) => {
          const order = ["USD", "KRW", "IDR"];
          return (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b));
        });
        const multiCurrency = currencies.length > 1;

        const handleCheckout = () => {
          if (selectedCount === 0) {
            Alert.alert(t("userCart.pickCurrencyTitle"), t("userCart.empty"));
            return;
          }
          if (multiCurrency) {
            const buttons = currencies.map((c) => ({
              text: `${c} ${SYM[c]}${currTotals[c].toLocaleString()}`,
              onPress: () => router.push({ pathname: "/(user)/purchase", params: { currency: c } }),
            }));
            buttons.push({ text: t("userCart.cancel"), onPress: () => { } });
            Alert.alert(t("userCart.pickCurrencyTitle"), t("userCart.pickCurrencyBody"), buttons);
          } else {
            router.push({ pathname: "/(user)/purchase", params: { currency: currencies[0] } });
          }
        };

        return (
          <View className="px-5 py-4 border-t border-border bg-white">
            {multiCurrency ? (
              <View className="mb-3">
                <Text className="text-xs text-muted-foreground mb-1">
                  {t("userCart.byCurrency").replace("{{count}}", String(currencies.length))}
                </Text>
                {currencies.map((c) => (
                  <View key={c} className="flex-row justify-between py-0.5">
                    <Text className="text-sm text-foreground">{c}</Text>
                    <Text className="text-sm font-bold text-foreground">
                      {SYM[c] ?? ""}{currTotals[c].toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="flex-row justify-between mb-3">
                <Text className="text-base text-foreground">
                  {t("userCart.totalLine").replace("{{count}}", String(getCartCount()))}
                </Text>
                <Text className="text-xl font-bold text-foreground">
                  {SYM[currencies[0]] ?? "₩"}{(currTotals[currencies[0]] ?? 0).toLocaleString()}
                </Text>
              </View>
            )}
            <Button onPress={handleCheckout}>
              {t("userCart.checkout")}
            </Button>
          </View>
        );
      })()}
    </SafeAreaView>
  );
}
