import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_46bddf() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const [v_e4a44d, v_32538e] = v_5ab095("");
  const [v_f63e09, v_1cbe59] = v_5ab095("");
  const [v_44f343, v_2f2a15] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_8075e9 = async () => {
    if (!v_e4a44d.trim() || !v_f63e09.trim()) {
      v_03e392.alert(v_8d41d7("merchant.record.alertMissingTitle"), v_8d41d7("merchant.record.alertMissingBody"));
      return;
    }
    const v_844935 = parseFloat(v_f63e09);
    if (isNaN(v_844935) || v_844935 <= 0) {
      v_03e392.alert(v_8d41d7("merchant.record.alertAmountTitle"), v_8d41d7("merchant.record.alertAmountBody"));
      return;
    }

    v_34a50a(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          barcode: v_e4a44d.trim(),
          amount: v_844935,
          memo: v_44f343.trim() || undefined,
        }),
      });
      v_03e392.alert(v_8d41d7("merchant.record.successTitle"), v_8d41d7("merchant.record.successBody"), [
        { text: v_8d41d7("merchant.record.ok"), onPress: () => v_904d46.back() },
      ]);
    } catch (v_49263d) {
      v_03e392.alert(v_8d41d7("merchant.record.failTitle"), v_49263d.body?.error || v_8d41d7("merchant.record.failBody"));
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title={v_8d41d7("merchant.record.title")} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 0 }}>
        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("merchant.record.barcode")}</Text>
          <Input
            placeholder={v_8d41d7("merchant.record.barcodePh")}
            value={v_e4a44d}
            onChangeText={v_32538e}
            keyboardType="number-pad"
            maxLength={14}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("merchant.record.amount")}</Text>
          <Input
            placeholder={v_8d41d7("merchant.record.amountPh")}
            value={v_f63e09}
            onChangeText={v_1cbe59}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("merchant.record.memo")}</Text>
          <Input placeholder={v_8d41d7("merchant.record.memoPh")} value={v_44f343} onChangeText={v_2f2a15} />
        </View>

        <Button
          onPress={v_8075e9}
          disabled={v_683210 || !v_e4a44d.trim() || !v_f63e09.trim()}
          className="mt-8"
        >
          {v_683210 ? v_8d41d7("merchant.record.submitting") : v_8d41d7("merchant.record.submit")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
