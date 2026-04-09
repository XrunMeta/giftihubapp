import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_a3b961 } from "xytbpcyuptfvuyelkypzvyijaumlzur";
import type { v_fe10f7 } from "sjckgizoxjyhghfnkltjj";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_58169c } from "ozkdkvoil";
import { v_a4ddab } from "eqrxxpgqjbwbqqqhvy";
import { v_d1d90c } from "rkmroqyctko";
import { v_9265a9 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_df9f57, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

type PurchaseRow = {
  id?: string;
  payment_id?: string;
  voucher_name?: string;
  brand?: string;
  amount?: number;
  payment_method?: string;
  created_at?: number;
  purchased_at?: number;
  source?: string;
};

function v_a6214d(v_3a5fef, locale: v_fe10f7): string | null {
  if (v_3a5fef == null || Number.isNaN(v_3a5fef)) return null;
  const v_d799e2 = v_3a5fef < 1e12 ? v_3a5fef * 1000 : v_3a5fef;
  try {
    return new Date(v_d799e2).toLocaleString(v_58169c(v_6f298b), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
}

export default function v_1a8c84() {
  const { t: v_8d41d7, locale: v_6f298b } = v_678659();
  const v_904d46 = v_d1d90c();
  const v_c6c04c = v_df9f57(
    () => [
      { key: "all", label: v_8d41d7("userSettlement.tabAll") },
      { key: "store", label: v_8d41d7("userSettlement.tabStore") },
      { key: "marketplace", label: v_8d41d7("userSettlement.tabMarketplace") },
    ],
    [v_8d41d7],
  );
  const [v_ac1d22, v_02dd63] = v_5ab095("all");
  const [v_a73c06, v_592b07] = v_5ab095<PurchaseRow[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    v_ef0460();
  }, [v_ac1d22]);

  const v_ef0460 = async () => {
    v_34a50a(true);
    try {
      const v_04e790 = v_ac1d22 === "all" ? undefined : v_ac1d22;
      const v_8f00b9 = await v_a4ddab({ source: v_04e790 as "store" | "marketplace" | "all" | undefined });
      const v_479f05 = v_8f00b9 as { purchases?: PurchaseRow[]; items?: PurchaseRow[] };
      const v_ef8ab1 = v_479f05.purchases ?? v_479f05.items ?? [];
      v_592b07(Array.isArray(v_ef8ab1) ? v_ef8ab1 : []);
    } catch {
      v_592b07([]);
    } finally {
      v_34a50a(false);
    }
  };

  const v_25e129 = (v_38d084) => {
    if (v_38d084 === "store") return v_8d41d7("userSettlement.tabStore");
    if (v_38d084 === "marketplace") return v_8d41d7("userSettlement.tabMarketplace");
    return null;
  };

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: PurchaseRow }) => {
    const v_9f1622 = v_8c0b26.voucher_name || v_8c0b26.brand || "—";
    const v_b74f68 = v_8c0b26.voucher_name && v_8c0b26.brand && v_8c0b26.brand !== v_8c0b26.voucher_name ? v_8c0b26.brand : null;
    const v_6467d8 = v_a6214d(v_8c0b26.purchased_at ?? v_8c0b26.created_at, v_6f298b);
    const v_38d084 = v_25e129(v_8c0b26.source);

    return (
      <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <View className="flex-row items-start justify-between gap-3 p-4">
          <View className="min-w-0 flex-1 flex-row gap-3">
            <View className="mt-0.5 h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ReceiptText size={22} color="#CE3630" strokeWidth={2} />
            </View>
            <View className="min-w-0 flex-1">
              <View className="flex-row flex-wrap items-center gap-2">
                <Text className="text-base font-bold leading-snug text-foreground" numberOfLines={2}>
                  {v_9f1622}
                </Text>
                {v_38d084 ? (
                  <View className="rounded-full border border-border bg-muted/60 px-2 py-0.5">
                    <Text className="text-xs font-semibold text-muted-foreground">{v_38d084}</Text>
                  </View>
                ) : null}
              </View>
              {v_b74f68 ? (
                <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={1}>
                  {v_b74f68}
                </Text>
              ) : null}
              <View className="mt-2 flex-row flex-wrap items-center gap-x-2 gap-y-1">
                {v_8c0b26.payment_method ? (
                  <Text className="text-sm font-medium text-muted-foreground">{v_8c0b26.payment_method}</Text>
                ) : null}
                {v_8c0b26.payment_method && v_6467d8 ? (
                  <Text className="text-sm text-muted-foreground">·</Text>
                ) : null}
                {v_6467d8 ? <Text className="text-sm text-muted-foreground">{v_6467d8}</Text> : null}
              </View>
            </View>
          </View>
          <Text className="shrink-0 pt-0.5 text-lg font-bold text-primary">
            ₩{(v_8c0b26.amount ?? 0).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View >
        <PageHeader
          title={v_8d41d7("userSettlement.title")}
          onBackPress={() => v_904d46.navigate("/(user)/mypage")}
        />
        <ScrollableTabs tabs={v_c6c04c} activeTab={v_ac1d22} onTabPress={v_02dd63} className="mb-1" />
      </View>
      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={v_a73c06}
          keyExtractor={(v_8c0b26, v_a56041) => String(v_8c0b26.id ?? v_8c0b26.payment_id ?? `purchase-${v_a56041}`)}
          renderItem={v_fcf6ec}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-base text-muted-foreground">{v_8d41d7("userSettlement.empty")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
