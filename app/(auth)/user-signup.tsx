import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/auth";

export default function UserSignupScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("입력 오류", "비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await register(email, password, name);
      await login(res.token, res.user);
      Alert.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
        { text: "확인", onPress: () => router.replace("/(user)/store") },
      ]);
    } catch (err: any) {
      Alert.alert("가입 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="사용자 회원가입" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">이름</Text>
              <Input placeholder="홍길동" value={name} onChangeText={setName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">이메일</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="email@example.com"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
              <Input secureTextEntry placeholder="8자 이상" value={password} onChangeText={setPassword} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호 확인</Text>
              <Input secureTextEntry placeholder="비밀번호 재입력" value={confirmPassword} onChangeText={setConfirmPassword} />
            </View>
          </View>

          <Button onPress={handleSignup} disabled={loading} className="mt-8">
            {loading ? "가입 중..." : "가입하기"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
