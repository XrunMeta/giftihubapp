import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { getMyVouchers, type Voucher } from "@/services/vouchers";
import { createListing } from "@/services/marketplace";

export default function MarketplaceSellScreen() {
  const router = useRouter();
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
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const fee = sellingPrice ? Math.round(Number(sellingPrice) * 0.05) : 0;
  const payout = sellingPrice ? Number(sellingPrice) - fee : 0;

  const handleSubmit = async () => {
    if (!selectedVoucher || !sellingPrice) {
      Alert.alert("입력 오류", "상품과 판매가를 입력해주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await createListing(selectedVoucher.id, Number(sellingPrice));
      Alert.alert("등록 완료", "중고마켓에 등록되었습니다.", [
        { text: "확인", onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert("등록 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="판매 등록" />
      <ScrollView className="flex-1 px-5">
        <Text className="text-base font-semibold text-foreground mb-2 mt-2">상품 선택</Text>
        <View className="gap-2 mb-4">
          {vouchers.map((v) => (
            <Pressable
              key={v.id}
              className={`p-3 rounded-xl border ${
                selectedVoucher?.id === v.id ? "border-primary bg-primary/5" : "border-border bg-card"
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
            <Text className="text-muted-foreground text-center py-8">판매할 수 있는 기프티가 없습니다.</Text>
          )}
        </View>

        {selectedVoucher && (
          <>
            <Text className="text-base font-semibold text-foreground mb-2">판매가 (KRW)</Text>
            <Input
              keyboardType="numeric"
              placeholder="판매 금액 입력"
              value={sellingPrice}
              onChangeText={setSellingPrice}
            />

            <View className="bg-card rounded-xl border border-border p-4 mt-4">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">수수료 (5%)</Text>
                <Text className="text-sm text-foreground">₩{fee.toLocaleString()}</Text>
              </View>
              <Separator className="my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-foreground">정산 예정금액</Text>
                <Text className="text-base font-bold text-primary">₩{payout.toLocaleString()}</Text>
              </View>
            </View>

            <Button onPress={handleSubmit} disabled={submitting} className="mt-6 mb-6">
              {submitting ? "등록 중..." : "판매 등록"}
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
