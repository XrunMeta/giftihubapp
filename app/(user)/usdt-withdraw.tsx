import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

interface WithdrawResponse {
  ok: boolean;
  tx_hash?: string;
  estimated_time?: string;
}

export default function v_df3264() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const [v_64d549, v_5ed714] = v_5ab095("");
  const [v_f63e09, v_1cbe59] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_9bd356 = (v_33c3a8) =>
    /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(v_33c3a8.trim());

  const v_d063db = async () => {
    if (!v_64d549.trim() || !v_f63e09.trim()) {
      v_03e392.alert(v_8d41d7("userUsdtWithdraw.errFieldsTitle"), v_8d41d7("userUsdtWithdraw.errFieldsBody"));
      return;
    }
    if (!v_9bd356(v_64d549)) {
      v_03e392.alert(v_8d41d7("userUsdtWithdraw.errAddrTitle"), v_8d41d7("userUsdtWithdraw.errAddrBody"));
      return;
    }
    const v_844935 = parseFloat(v_f63e09);
    if (isNaN(v_844935) || v_844935 <= 0) {
      v_03e392.alert(v_8d41d7("userUsdtWithdraw.errAmountTitle"), v_8d41d7("userUsdtWithdraw.errAmountBody"));
      return;
    }

    const v_d73b64 = `${v_64d549.substring(0, 8)}...${v_64d549.substring(v_64d549.length - 6)}`;
    v_03e392.alert(
      v_8d41d7("userUsdtWithdraw.confirmTitle"),
      v_8d41d7("userUsdtWithdraw.confirmBody")
        .replace("{{amount}}", String(v_844935))
        .replace("{{addrPreview}}", v_d73b64),
      [
        { text: v_8d41d7("userUsdtWithdraw.cancel"), style: "cancel" },
        {
          text: v_8d41d7("userUsdtWithdraw.submit"),
          style: "destructive",
          onPress: async () => {
            v_34a50a(true);
            try {
              const v_8f00b9 = await v_bc1b24<WithdrawResponse>(
                "/oth-path",
                {
                  method: "POST",
                  body: JSON.stringify({
                    wallet_address: v_64d549.trim(),
                    amount: v_844935,
                    network: "TRC-20",
                  }),
                },
              );
              const v_a20432 =
                v_8d41d7("userUsdtWithdraw.successBody") +
                (v_8f00b9.estimated_time
                  ? v_8d41d7("userUsdtWithdraw.successEta").replace("{{eta}}", v_8f00b9.estimated_time)
                  : `\n${v_8d41d7("userUsdtWithdraw.successPending")}`);
              v_03e392.alert(v_8d41d7("userUsdtWithdraw.successTitle"), v_a20432, [
                { text: v_8d41d7("userUsdtWithdraw.ok"), onPress: () => v_904d46.back() },
              ]);
            } catch (v_49263d) {
              v_03e392.alert(v_8d41d7("userUsdtWithdraw.failTitle"), v_49263d.body?.error || v_8d41d7("userUsdtWithdraw.failBody"));
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
      <PageHeader title={v_8d41d7("userUsdtWithdraw.title")} />
      <ScrollView className="flex-1 px-6">
        <View className="bg-card border border-border rounded-xl p-4 mt-4">
          <Text className="text-xs text-muted-foreground">{v_8d41d7("userUsdtWithdraw.networkLabel")}</Text>
          <Text className="text-base font-semibold text-foreground mt-1">
            {v_8d41d7("userUsdtWithdraw.networkValue")}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {v_8d41d7("userUsdtWithdraw.addrLabel")}
          </Text>
          <Input
            placeholder={v_8d41d7("userUsdtWithdraw.addrPh")}
            value={v_64d549}
            onChangeText={v_5ed714}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {v_8d41d7("userUsdtWithdraw.amountLabel")}
          </Text>
          <Input
            placeholder={v_8d41d7("userUsdtWithdraw.amountPh")}
            value={v_f63e09}
            onChangeText={v_1cbe59}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">{v_8d41d7("userUsdtWithdraw.noticeTitle")}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {v_8d41d7("userUsdtWithdraw.notice1")}
            {"\n"}
            {v_8d41d7("userUsdtWithdraw.notice2")}
            {"\n"}
            {v_8d41d7("userUsdtWithdraw.notice3")}
            {"\n"}
            {v_8d41d7("userUsdtWithdraw.notice4")}
          </Text>
        </View>

        <Button
          onPress={v_d063db}
          disabled={v_683210 || !v_64d549.trim() || !v_f63e09.trim()}
          className="mt-8"
        >
          {v_683210 ? v_8d41d7("userUsdtWithdraw.processing") : v_8d41d7("userUsdtWithdraw.requestBtn")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
