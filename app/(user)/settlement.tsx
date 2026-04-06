import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
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
      const v_8f00b9 = await v_a4ddab({ source: v_04e790 as any });
      v_592b07((v_8f00b9 as any).purchases || []);
    } catch {

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
          renderItem={({ item: v_8c0b26 }) => (
            <View className="mx-4 mb-2 bg-card rounded-lg border border-border p-3">
              <View className="flex-row justify-between">
                <Text className="text-sm font-medium text-foreground">{v_8c0b26.voucher_name || v_8c0b26.brand}</Text>
                <Text className="text-sm font-bold text-foreground">₩{v_8c0b26.amount?.toLocaleString()}</Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-1">{v_8c0b26.payment_method}</Text>
            </View>
          )}
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
