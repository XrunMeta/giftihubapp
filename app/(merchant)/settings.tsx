import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/services/api";

export default function MerchantSettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  type SettlementPolicy = "anytime" | "monthly" | "request_only";
  const POLICY_OPTIONS: { key: SettlementPolicy; label: string; desc: string }[] = [
    { key: "anytime", label: "자유 정산", desc: "관리자가 아무 때나 정산" },
    { key: "monthly", label: "월별 정산", desc: "지난달 내역만 정산" },
    { key: "request_only", label: "요청 정산", desc: "내가 요청한 것만 정산" },
  ];

  const [policy, setPolicy] = useState<SettlementPolicy>("anytime");
  const [policyLoading, setPolicyLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ settlement_policy: string }>("/oth-path")
      .then((data) => setPolicy(data.settlement_policy as SettlementPolicy))
      .catch(() => {})
      .finally(() => setPolicyLoading(false));
  }, []);

  const changePolicy = async (p: SettlementPolicy) => {
    const prev = policy;
    setPolicy(p);
    try {
      await apiFetch("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ settlement_policy: p }),
      });
    } catch { setPolicy(prev); }
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: async () => {
        await logout();
        router.replace("/(auth)/login");
      }},
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">설정</Text>
      </View>

      <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
        <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
        {user?.email && <Text className="text-sm text-muted-foreground mt-0.5">{user.email}</Text>}
        <Text className="text-xs text-primary mt-1">가맹점 계정</Text>
      </View>

      <View className="mt-6 px-4">
        <Text className="text-base font-semibold text-foreground mb-3">정산 정책</Text>
        {policyLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          POLICY_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => changePolicy(opt.key)}
              className={"flex-row items-center p-3 mb-2 rounded-lg border " + (policy === opt.key ? "border-primary bg-primary/10" : "border-border")}
            >
              <View className={"w-5 h-5 rounded-full border-2 mr-3 items-center justify-center " + (policy === opt.key ? "border-primary" : "border-muted-foreground")}>
                {policy === opt.key && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <View>
                <Text className="text-sm font-medium text-foreground">{opt.label}</Text>
                <Text className="text-xs text-muted-foreground">{opt.desc}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View className="px-4 mt-4">
        <Button variant="outline" onPress={handleLogout} className="flex-row gap-2">
          <LogOut size={18} color="#ef4444" />
          <Text className="text-destructive font-medium">로그아웃</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
