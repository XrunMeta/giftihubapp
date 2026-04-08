import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";

const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };
function v_2396c3(v_f63e09, v_a832b3) {
  const v_c37780 = v_928ad6[v_a832b3 ?? "KRW"] ?? "";
  return `${v_c37780}${v_f63e09?.toLocaleString() ?? 0}`;
}
import { v_a3b961 } from "xytbpcyuptfvuyelkypzvyijaumlzur";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_a4ddab } from "eqrxxpgqjbwbqqqhvy";
import v_a3453e, { v_c4deb2, v_df9f57, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_1a8c84() {
  const { t: v_8d41d7 } = v_678659();
  const v_c6c04c = v_df9f57(
    () => [
      { key: "all", label: v_8d41d7("userSettlement.tabAll") },
      { key: "store", label: v_8d41d7("userSettlement.tabStore") },
      { key: "marketplace", label: v_8d41d7("userSettlement.tabMarketplace") },
    ],
    [v_8d41d7],
  );
  const [v_ac1d22, v_02dd63] = v_5ab095("all");
  const [v_a73c06, v_592b07] = v_5ab095<any[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    v_ef0460();
  }, [v_ac1d22]);

  const v_ef0460 = async () => {
    v_34a50a(true);
    try {
      const v_04e790 = v_ac1d22 === "all" ? undefined : v_ac1d22;
      console.log("[settlement] loading, source=", v_04e790);
      const v_8f00b9 = await v_a4ddab({ source: v_04e790 as any });
      console.log("[settlement] res=", JSON.stringify(v_8f00b9));
      v_592b07((v_8f00b9 as any).purchases || []);
    } catch (v_9e86fd) {
      console.error("[settlement] error:", v_9e86fd);
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("userSettlement.title")} />
      <ScrollableTabs tabs={v_c6c04c} activeTab={v_ac1d22} onTabPress={v_02dd63} className="mb-3" />

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={v_a73c06}
          keyExtractor={(v_8c0b26) => v_8c0b26.id}
          renderItem={({ item: v_8c0b26 }) => {
            const v_ac12e8 = !!v_8c0b26.set_id;
            const v_f9fd27 = v_8c0b26.set_vouchers ?? [];
            if (v_ac12e8) {
              return (
                <View className="mx-4 mb-2 bg-card rounded-xl border border-primary/30 p-3">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center">
                      <Package size={15} color="#CE3630" />
                    </View>
                    <Text className="text-sm font-semibold text-primary flex-1">
                      {v_8d41d7("myGifti.list.bundleTitle").replace("{{count}}", String(v_8c0b26.set_count ?? v_f9fd27.length ?? ""))}
                    </Text>
                    <Text className="text-sm font-bold text-foreground">{v_2396c3(v_8c0b26.set_total_amount ?? v_8c0b26.amount, v_8c0b26.set_currency || v_8c0b26.currency || v_8c0b26.base_currency)}</Text>
                  </View>
                  {v_f9fd27.map((v_81e2ef, v_ebec57) => (
                    <View key={v_ebec57} className="flex-row justify-between py-1 border-t border-border">
                      <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>{v_81e2ef.brand} · {v_81e2ef.name}</Text>
                      <Text className="text-xs text-muted-foreground">{v_2396c3(v_81e2ef.face_value_base || v_81e2ef.face_value, v_81e2ef.base_currency)}</Text>
                    </View>
                  ))}
                  <Text className="text-xs text-muted-foreground mt-1">{v_8c0b26.payment_method}</Text>
                </View>
              );
            }
            return (
              <View className="mx-4 mb-2 bg-card rounded-lg border border-border p-3">
                <View className="flex-row justify-between">
                  <Text className="text-sm font-medium text-foreground">{v_8c0b26.voucher_name || v_8c0b26.brand}</Text>
                  <Text className="text-sm font-bold text-foreground">{v_2396c3(v_8c0b26.amount, v_8c0b26.currency || v_8c0b26.base_currency)}</Text>
                </View>
                <Text className="text-xs text-muted-foreground mt-1">{v_8c0b26.payment_method}</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("userSettlement.empty")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
