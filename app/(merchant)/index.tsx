import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MerchantHomeScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [manualCode, setManualCode] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    router.push({ pathname: "/(merchant)/process", params: { barcode: data } });
    setTimeout(() => setScanned(false), 2000);
  };

  const handleManualEntry = () => {
    if (manualCode.length < 8) {
      Alert.alert(t("merchant.scan.alertBarcodeTitle"), t("merchant.scan.alertBarcodeBody"));
      return;
    }
    router.push({ pathname: "/(merchant)/process", params: { barcode: manualCode } });
    setManualCode("");
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
        <Text className="text-lg font-semibold text-foreground mb-4">{t("merchant.scan.cameraTitle")}</Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          {t("merchant.scan.cameraBody")}
        </Text>
        <Button onPress={requestPermission}>{t("merchant.scan.allowCamera")}</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("merchant.scan.title")} />

      <View className="flex-1 mx-4 rounded-xl overflow-hidden border border-border">
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["code128", "qr"] }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      </View>

      <View className="px-4 pt-3 py-4">
        <Text className="text-sm font-medium text-foreground mb-2">{t("merchant.scan.manualEntry")}</Text>
        <View className="flex-row gap-2">
          <Input
            className="flex-1 bg-white"
            placeholder={t("merchant.scan.barcodePlaceholder")}
            keyboardType="numeric"
            value={manualCode}
            onChangeText={setManualCode}
          />
          <Button onPress={handleManualEntry}>{t("merchant.scan.confirm")}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
