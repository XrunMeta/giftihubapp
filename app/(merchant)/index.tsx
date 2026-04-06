import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MerchantHomeScreen() {
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
      Alert.alert("입력 오류", "올바른 바코드를 입력해주세요.");
      return;
    }
    router.push({ pathname: "/(merchant)/process", params: { barcode: manualCode } });
    setManualCode("");
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
        <Text className="text-lg font-semibold text-foreground mb-4">카메라 권한 필요</Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          바코드 스캔을 위해 카메라 권한이 필요합니다.
        </Text>
        <Button onPress={requestPermission}>권한 허용</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title="바코드 스캔" />

      <View className="flex-1 mx-4 rounded-xl overflow-hidden border border-border">
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["code128", "qr"] }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      </View>

      <View className="px-4 pt-3 py-4">
        <Text className="text-sm font-medium text-foreground mb-2">직접 입력</Text>
        <View className="flex-row gap-2">
          <Input
            className="flex-1 bg-white"
            placeholder="바코드 번호 입력"
            keyboardType="numeric"
            value={manualCode}
            onChangeText={setManualCode}
          />
          <Button onPress={handleManualEntry}>확인</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
