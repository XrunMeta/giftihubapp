import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_86db47 } from "vkhyfothlklikcpovbqirr";
import { v_720509, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import {
  v_39a996,
  v_03e392,
  v_e767d1,
  v_326be8,
  v_09d0e5,
  v_122070,
  v_19b633,
  v_3094a2,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_3072c9() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const { voucherId: v_ba63f8 } = v_d1a7ac<{ voucherId?: string }>();
  const [v_f9fd27, v_3a2126] = v_5ab095<v_7fb3de[]>([]);
  const [v_119885, v_36e0c4] = v_5ab095<v_7fb3de | null>(null);
  const [v_7ae44d, v_27a321] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_cb66b4, v_ee9ec1] = v_5ab095(false);

  v_c4deb2(() => {
    v_cb3615();
  }, []);

  const v_cb3615 = async () => {
    try {
      const v_8f00b9 = await v_720509("active");
      v_3a2126(v_8f00b9.vouchers);

      if (v_ba63f8) {
        const v_ea6dff = v_8f00b9.vouchers.find((v_81e2ef) => v_81e2ef.id === v_ba63f8);
        if (v_ea6dff) {
          v_36e0c4(v_ea6dff);
          v_27a321(String(Math.round(v_ea6dff.face_value * 0.9)));
        }
      }
    } catch {

    } finally {
      v_34a50a(false);
    }
  };

  const v_2d815e = v_7ae44d ? Math.round(Number(v_7ae44d) * 0.05) : 0;
  const v_daa996 = v_7ae44d ? Number(v_7ae44d) - v_2d815e : 0;

  const v_585b02 = async () => {
    if (!v_119885 || !v_7ae44d) {
      v_03e392.alert(v_8d41d7("userMarketplace.sell.alertMissingTitle"), v_8d41d7("userMarketplace.sell.alertMissingBody"));
      return;
    }
    v_ee9ec1(true);
    try {
      await v_86db47(v_119885.id, Number(v_7ae44d));
      v_03e392.alert(v_8d41d7("userMarketplace.sell.successTitle"), v_8d41d7("userMarketplace.sell.successBody"), [
        { text: v_8d41d7("userMarketplace.sell.ok"), onPress: () => v_904d46.back() },
      ]);
    } catch (v_49263d) {
      v_03e392.alert(v_8d41d7("userMarketplace.sell.failTitle"), v_49263d.body?.error || v_8d41d7("userMarketplace.sell.failBody"));
    } finally {
      v_ee9ec1(false);
    }
  };

  if (v_683210) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("userMarketplace.sell.title")} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={v_326be8.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 12 }}
        >
          <Text className="text-base font-semibold text-foreground mb-2">{v_8d41d7("userMarketplace.sell.selectProduct")}</Text>
          <View className="gap-2">
            {v_f9fd27.map((v_81e2ef) => (
              <Pressable
                key={v_81e2ef.id}
                className={`p-3 rounded-xl border ${v_119885?.id === v_81e2ef.id ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                onPress={() => {
                  v_36e0c4(v_81e2ef);
                  v_27a321(String(Math.round(v_81e2ef.face_value * 0.9)));
                }}
              >
                <Text className="text-xs text-muted-foreground">{v_81e2ef.brand}</Text>
                <Text className="text-sm font-medium text-foreground">{v_81e2ef.name}</Text>
                <Text className="text-sm font-bold text-foreground mt-1">
                  ₩{v_81e2ef.face_value.toLocaleString()}
                </Text>
              </Pressable>
            ))}
            {v_f9fd27.length === 0 && (
              <Text className="text-muted-foreground text-center py-8">{v_8d41d7("userMarketplace.sell.emptyVouchers")}</Text>
            )}
          </View>
        </ScrollView>

        {v_119885 ? (
          <View className="border-t border-border bg-white px-5 pt-4 pb-2 gap-3">
            <Text className="text-base font-semibold text-foreground">{v_8d41d7("userMarketplace.sell.sellingPrice")}</Text>
            <Input
              keyboardType="numeric"
              placeholder={v_8d41d7("userMarketplace.sell.sellingPricePh")}
              value={v_7ae44d}
              onChangeText={v_27a321}
            />

            <View className="bg-card rounded-xl border border-border p-4">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">{v_8d41d7("userMarketplace.sell.feeLabel")}</Text>
                <Text className="text-sm text-foreground">₩{v_2d815e.toLocaleString()}</Text>
              </View>
              <Separator className="my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-foreground">{v_8d41d7("userMarketplace.sell.payoutLabel")}</Text>
                <Text className="text-base font-bold text-primary">₩{v_daa996.toLocaleString()}</Text>
              </View>
            </View>

            <Button onPress={v_585b02} disabled={v_cb66b4}>
              {v_cb66b4 ? v_8d41d7("userMarketplace.sell.submitting") : v_8d41d7("userMarketplace.sell.submit")}
            </Button>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
