import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, XCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProcessScreen() {
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
        setErrorMsg(res.error || "알 수 없는 오류");
        setStatus("invalid");
        return;
      }
      setVoucherInfo(res);
      setStatus("valid");
    } catch (err: any) {
      const msg = err.body?.error || err.message || "서버 연결 실패";
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
      Alert.alert("처리 실패", err.body?.error || "다시 시도해주세요.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="바우처 확인" />
      <View className="flex-1 items-center justify-center px-6">
        {status === "validating" && (
          <>
            <ActivityIndicator size="large" color="#CE3630" />
            <Text className="text-lg font-semibold text-foreground mt-4">확인 중...</Text>
          </>
        )}

        {status === "valid" && voucherInfo && (
          <View className="items-center w-full">
            <CheckCircle size={64} color="#22c55e" />
            <Text className="text-xl font-bold text-foreground mt-4">유효한 바우처</Text>
            <View className="bg-card rounded-xl border border-border p-4 mt-4 w-full">
              <Text className="text-sm text-muted-foreground">{voucherInfo.brand}</Text>
              <Text className="text-base font-semibold text-foreground">{voucherInfo.name}</Text>
              <Text className="text-lg font-bold text-primary mt-2">
                ₩{voucherInfo.face_value?.toLocaleString()}
              </Text>
            </View>
            <Button className="w-full mt-6" onPress={handleUse}>사용 처리</Button>
            <Button variant="outline" className="w-full mt-2" onPress={() => router.back()}>취소</Button>
          </View>
        )}

        {status === "invalid" && (
          <View className="items-center">
            <XCircle size={64} color="#ef4444" />
            <Text className="text-xl font-bold text-foreground mt-4">유효하지 않은 바코드</Text>
            <Text className="text-sm text-muted-foreground mt-2">{errorMsg || "다시 스캔해주세요."}</Text>
            <Button className="mt-6" onPress={() => router.back()}>돌아가기</Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
