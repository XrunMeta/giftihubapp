import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
interface WithdrawResponse {
  ok: boolean;
  tx_hash?: string;
  estimated_time?: string;
}

export default function UsdtWithdrawScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidTrc20 = (addr: string) =>
    /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr.trim());

  const handleWithdraw = async () => {
    if (!walletAddress.trim() || !amount.trim()) {
      alert(t("userUsdtWithdraw.errFieldsTitle"), t("userUsdtWithdraw.errFieldsBody"));
      return;
    }
    if (!isValidTrc20(walletAddress)) {
      alert(t("userUsdtWithdraw.errAddrTitle"), t("userUsdtWithdraw.errAddrBody"));
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert(t("userUsdtWithdraw.errAmountTitle"), t("userUsdtWithdraw.errAmountBody"));
      return;
    }

    const addrPreview = `${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 6)}`;
    alert(
      t("userUsdtWithdraw.confirmTitle"),
      t("userUsdtWithdraw.confirmBody")
        .replace("{{amount}}", String(numAmount))
        .replace("{{addrPreview}}", addrPreview),
      [
        { text: t("userUsdtWithdraw.cancel"), style: "cancel" },
        {
          text: t("userUsdtWithdraw.submit"),
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const res = await apiFetch<WithdrawResponse>(
                "/oth-path",
                {
                  method: "POST",
                  body: JSON.stringify({
                    wallet_address: walletAddress.trim(),
                    amount: numAmount,
                    network: "TRC-20",
                  }),
                },
              );
              const successMsg =
                t("userUsdtWithdraw.successBody") +
                (res.estimated_time
                  ? t("userUsdtWithdraw.successEta").replace("{{eta}}", res.estimated_time)
                  : `\n${t("userUsdtWithdraw.successPending")}`);
              alert(t("userUsdtWithdraw.successTitle"), successMsg, [
                { text: t("userUsdtWithdraw.ok"), onPress: () => router.back() },
              ]);
            } catch (err: any) {
              alert(t("userUsdtWithdraw.failTitle"), err.body?.error || t("userUsdtWithdraw.failBody"));
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("userUsdtWithdraw.title")} fallbackHref="/(user)/mypage" />
      <ScrollView className="flex-1 px-6">
        <View className="bg-card border border-border rounded-xl p-4 mt-4">
          <Text className="text-xs text-muted-foreground">{t("userUsdtWithdraw.networkLabel")}</Text>
          <Text className="text-base font-semibold text-foreground mt-1">
            {t("userUsdtWithdraw.networkValue")}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {t("userUsdtWithdraw.addrLabel")}
          </Text>
          <Input
            placeholder={t("userUsdtWithdraw.addrPh")}
            value={walletAddress}
            onChangeText={setWalletAddress}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {t("userUsdtWithdraw.amountLabel")}
          </Text>
          <Input
            placeholder={t("userUsdtWithdraw.amountPh")}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">{t("userUsdtWithdraw.noticeTitle")}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {t("userUsdtWithdraw.notice1")}
            {"\n"}
            {t("userUsdtWithdraw.notice2")}
            {"\n"}
            {t("userUsdtWithdraw.notice3")}
            {"\n"}
            {t("userUsdtWithdraw.notice4")}
          </Text>
        </View>

        <Button
          onPress={handleWithdraw}
          disabled={loading || !walletAddress.trim() || !amount.trim()}
          className="mt-8"
        >
          {loading ? t("userUsdtWithdraw.processing") : t("userUsdtWithdraw.requestBtn")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
