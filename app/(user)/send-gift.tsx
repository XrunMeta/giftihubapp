import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_0e27e2 } from "pvulvehakmpzwkznlnd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_cf96d1() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const v_904d46 = v_d1d90c();
  const { voucherId: v_ba63f8, voucherName: v_ec659d } = v_d1a7ac<{
    voucherId: string;
    voucherName: string;
  }>();
  const [v_980f9f, v_f96885] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_03fe4a = async () => {
    if (!v_980f9f.trim()) {
      v_5c50c0(v_8d41d7("userSendGift.errTelegramTitle"), v_8d41d7("userSendGift.errTelegramBody"));
      return;
    }
    if (!v_ba63f8) {
      v_5c50c0(v_8d41d7("userSendGift.errVoucherTitle"), v_8d41d7("userSendGift.errVoucherBody"));
      return;
    }

    v_5c50c0(
      v_8d41d7("userSendGift.confirmTitle"),
      v_8d41d7("userSendGift.confirmBody")
        .replace("{{name}}", v_ec659d || v_8d41d7("userSendGift.defaultGiftName"))
        .replace("{{id}}", v_980f9f),
      [
        { text: v_8d41d7("userSendGift.cancel"), style: "cancel" },
        {
          text: v_8d41d7("userSendGift.send"),
          onPress: async () => {
            v_34a50a(true);
            try {
              const v_8f00b9 = await v_0e27e2(v_ba63f8, v_980f9f.trim());
              v_5c50c0(
                v_8d41d7("userSendGift.successTitle"),
                `${v_8d41d7("userSendGift.successBody")}${v_8f00b9.fee > 0 ? v_8d41d7("userSendGift.successFee").replace("{{fee}}", String(v_8f00b9.fee)) : ""}`,
                [{ text: v_8d41d7("userSendGift.ok"), onPress: () => v_904d46.back() }],
              );
            } catch (v_49263d) {
              v_5c50c0(v_8d41d7("userSendGift.failTitle"), v_49263d.body?.error || v_8d41d7("userSendGift.failBody"));
            } finally {
              v_34a50a(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("userSendGift.title")} />
      <ScrollView className="flex-1 px-6">
        {v_ec659d ? (
          <View className="bg-card border border-border rounded-xl p-4 mt-4">
            <Text className="text-xs text-muted-foreground">{v_8d41d7("userSendGift.voucherLabel")}</Text>
            <Text className="text-base font-semibold text-foreground mt-1">
              {v_ec659d}
            </Text>
          </View>
        ) : null}

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {v_8d41d7("userSendGift.telegramLabel")}
          </Text>
          <Input
            placeholder={v_8d41d7("userSendGift.telegramPh")}
            value={v_980f9f}
            onChangeText={v_f96885}
            keyboardType="number-pad"
          />
          <Text className="text-xs text-muted-foreground mt-2">{v_8d41d7("userSendGift.telegramHint")}</Text>
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">{v_8d41d7("userSendGift.noticeTitle")}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {v_8d41d7("userSendGift.notice1")}
            {"\n"}
            {v_8d41d7("userSendGift.notice2")}
            {"\n"}
            {v_8d41d7("userSendGift.notice3")}
          </Text>
        </View>

        <Button
          onPress={v_03fe4a}
          disabled={v_683210 || !v_980f9f.trim()}
          className="mt-8"
        >
          {v_683210 ? v_8d41d7("userSendGift.sending") : v_8d41d7("userSendGift.submit")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
