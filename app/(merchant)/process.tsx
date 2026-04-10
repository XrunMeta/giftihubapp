import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { formatPrice } from "@/lib/currency";
import { apiFetch } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, XCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function ProcessScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { barcode } = useLocalSearchParams<{ barcode: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<"validating" | "valid" | "invalid">("validating");
  const [voucherInfo, setVoucherInfo] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (barcode) validate();
  }, [barcode]);

  const validate = async () => {
    try {
      const res = await apiFetch<any>("/oth-path", {
        method: "POST",
        body: JSON.stringify({ barcode }),
      });
      if (!res.valid) {
        setErrorMsg(res.error || t("merchant.process.unknownError"));
        setStatus("invalid");
        return;
      }
      setVoucherInfo(res);
      setStatus("valid");
    } catch (err: any) {
      const msg = err.body?.error || err.message || t("merchant.process.serverError");
      setErrorMsg(`[${err.status || "?"}] ${msg}`);
      setStatus("invalid");
    }
  };

  const handleUse = async () => {
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({ barcode }),
      });
      router.replace("/(merchant)/process-complete");
    } catch (err: any) {
      alert(t("merchant.process.failTitle"), err.body?.error || t("merchant.process.failBody"));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title={t("merchant.process.title")} />
      <View className="flex-1 items-center justify-center px-6">
        {status === "validating" && (
          <>
            <ActivityIndicator size="large" color="#CE3630" />
            <Text className="text-lg font-semibold text-foreground mt-4">{t("merchant.process.checking")}</Text>
          </>
        )}

        {status === "valid" && voucherInfo && (
          <View className="items-center w-full">
            <CheckCircle size={64} color="#22c55e" />
            <Text className="text-xl font-bold text-foreground mt-4">{t("merchant.process.validTitle")}</Text>
            <View className="bg-card rounded-xl border border-border p-4 mt-4 w-full">
              <Text className="text-sm text-muted-foreground">{voucherInfo.brand}</Text>
              <Text className="text-base font-semibold text-foreground">{voucherInfo.name}</Text>
              <Text className="text-lg font-bold text-primary mt-2">
                {formatPrice(voucherInfo.face_value)}
              </Text>
            </View>
            <Button className="w-full mt-6" onPress={handleUse}>
              {t("merchant.process.useNow")}
            </Button>
            <Button variant="outline" className="w-full mt-2" onPress={() => router.back()}>
              {t("merchant.process.cancel")}
            </Button>
          </View>
        )}

        {status === "invalid" && (
          <View className="items-center">
            <XCircle size={64} color="#ef4444" />
            <Text className="text-xl font-bold text-foreground mt-4">{t("merchant.process.invalidTitle")}</Text>
            <Text className="text-sm text-muted-foreground mt-2">
              {errorMsg || t("merchant.process.scanAgain")}
            </Text>
            <Button className="mt-6" onPress={() => router.back()}>
              {t("merchant.process.goBack")}
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
