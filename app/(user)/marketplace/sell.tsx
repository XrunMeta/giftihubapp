import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { createListing } from "@/services/marketplace";
import { getMyVouchers, type Voucher } from "@/services/vouchers";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function MarketplaceSellScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const router = useRouter();
  const { voucherId } = useLocalSearchParams<{ voucherId?: string }>();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [sellingPrice, setSellingPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    try {
      const res = await getMyVouchers("active");
      setVouchers(res.vouchers);

      if (voucherId) {
        const found = res.vouchers.find((v) => v.id === voucherId);
        if (found) {
          setSelectedVoucher(found);
          setSellingPrice(String(Math.round(found.face_value * 0.9)));
        }
      }
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const fee = sellingPrice ? Math.round(Number(sellingPrice) * 0.05) : 0;
  const payout = sellingPrice ? Number(sellingPrice) - fee : 0;

  const handleSubmit = async () => {
    if (!selectedVoucher || !sellingPrice) {
      alert(t("userMarketplace.sell.alertMissingTitle"), t("userMarketplace.sell.alertMissingBody"));
      return;
    }
    setSubmitting(true);
    try {
      await createListing(selectedVoucher.id, Number(sellingPrice));
      alert(t("userMarketplace.sell.successTitle"), t("userMarketplace.sell.successBody"), [
        { text: t("userMarketplace.sell.ok"), onPress: () => router.back() },
      ]);
    } catch (err: any) {
      alert(t("userMarketplace.sell.failTitle"), err.body?.error || t("userMarketplace.sell.failBody"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("userMarketplace.sell.title")} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 12 }}
        >
          <Text className="text-base font-semibold text-foreground mb-2">{t("userMarketplace.sell.selectProduct")}</Text>
          <View className="gap-2">
            {vouchers.map((v) => (
              <Pressable
                key={v.id}
                className={`p-3 rounded-xl border ${selectedVoucher?.id === v.id ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                onPress={() => {
                  setSelectedVoucher(v);
                  setSellingPrice(String(Math.round(v.face_value * 0.9)));
                }}
              >
                <Text className="text-xs text-muted-foreground">{v.brand}</Text>
                <Text className="text-sm font-medium text-foreground">{v.name}</Text>
                <Text className="text-sm font-bold text-foreground mt-1">
                  ₩{v.face_value.toLocaleString()}
                </Text>
              </Pressable>
            ))}
            {vouchers.length === 0 && (
              <Text className="text-muted-foreground text-center py-8">{t("userMarketplace.sell.emptyVouchers")}</Text>
            )}
          </View>
        </ScrollView>

        {selectedVoucher ? (
          <View className="border-t border-border bg-white px-5 pt-4 pb-2 gap-3">
            <Text className="text-base font-semibold text-foreground">{t("userMarketplace.sell.sellingPrice")}</Text>
            <Input
              keyboardType="numeric"
              placeholder={t("userMarketplace.sell.sellingPricePh")}
              value={sellingPrice}
              onChangeText={setSellingPrice}
            />

            <View className="bg-card rounded-xl border border-border p-4">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">{t("userMarketplace.sell.feeLabel")}</Text>
                <Text className="text-sm text-foreground">₩{fee.toLocaleString()}</Text>
              </View>
              <Separator className="my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-foreground">{t("userMarketplace.sell.payoutLabel")}</Text>
                <Text className="text-base font-bold text-primary">₩{payout.toLocaleString()}</Text>
              </View>
            </View>

            <Button onPress={handleSubmit} disabled={submitting}>
              {submitting ? t("userMarketplace.sell.submitting") : t("userMarketplace.sell.submit")}
            </Button>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
