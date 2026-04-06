import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MerchantSignupScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !businessName) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await register(email, password, `${businessName} (${name})`);
      await login(res.token, res.user);
      Alert.alert("가입 완료", "가맹점 회원가입이 완료되었습니다!", [
        { text: "확인", onPress: () => router.replace("/(merchant)") },
      ]);
    } catch (err: any) {
      Alert.alert("가입 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="가맹점 회원가입" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">상호명</Text>
              <Input placeholder="가맹점 이름" value={businessName} onChangeText={setBusinessName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">대표자명</Text>
              <Input placeholder="홍길동" value={name} onChangeText={setName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">이메일</Text>
              <Input keyboardType="email-address" autoCapitalize="none" placeholder="email@example.com" value={email} onChangeText={setEmail} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
              <Input secureTextEntry placeholder="8자 이상" value={password} onChangeText={setPassword} />
            </View>
          </View>

          <Button onPress={handleSignup} disabled={loading} className="mt-8">
            {loading ? "가입 중..." : "가맹점 가입 신청"}
          </Button>

          <Text className="text-xs text-muted-foreground text-center mt-4">
            가입 후 관리자 승인이 필요합니다.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
