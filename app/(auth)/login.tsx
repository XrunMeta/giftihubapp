import React, { useState, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert, Image, Switch, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { loginWithEmail } from "@/services/auth";
import { images } from "@/assets/images";
import { getSavedEmail, setSavedEmail, removeSavedEmail, getRememberMe, setRememberMe, getBaseUrl, getServerMode, setServerMode } from "@/services/api";
import { useDevMode } from "@/hooks/use-dev-mode";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const isDevMode = useDevMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMeState] = useState(true);
  const [serverMode, setServerModeState] = useState<"local" | "remote">(getServerMode());

  useEffect(() => {
    (async () => {
      const saved = await getSavedEmail();
      if (saved) setEmail(saved);
      const remember = await getRememberMe();
      setRememberMeState(remember);
    })();
  }, []);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginWithEmail(email, password);
      await setRememberMe(rememberMe);
      if (rememberMe) {
        await setSavedEmail(email);
      } else {
        await removeSavedEmail();
      }
      await login(res.token, res.user);
      const dest = res.user.role === "merchant" ? "/(merchant)" : "/(user)/store";
      router.replace(dest);
    } catch (err: any) {
      Alert.alert("로그인 실패", err.body?.error || "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramLogin = async () => {
    try {
      const redirectUrl = Linking.createURL("auth-callback");
      const result = await WebBrowser.openAuthSessionAsync(
        `https://giftihubapi.pages.dev/page/login?redirect=${encodeURIComponent(redirectUrl)}`,
        redirectUrl,
      );
      if (result.type === "success" && result.url) {
        const parsed = Linking.parse(result.url);
        const token = parsed.queryParams?.token as string;
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const role = payload.role || "user";
            await setRememberMe(rememberMe);
            await login(token, { id: payload.sub, name: payload.name || "", role });
            const dest = role === "merchant" ? "/(merchant)" : "/(user)/store";
            router.replace(dest);
          } catch {
            Alert.alert("오류", "인증 토큰을 처리할 수 없습니다.");
          }
        }
      }
    } catch {
      Alert.alert("오류", "Telegram 로그인을 열 수 없습니다.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8">
            <Image
              source={images.logo}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-foreground">GiftiHub</Text>
            <Text className="text-sm text-muted-foreground mt-1">디지털 기프티 플랫폼</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-foreground mb-1.5">이메일</Text>
            <Input
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
            <Input
              secureTextEntry
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-sm text-muted-foreground">로그인 유지</Text>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMeState}
              trackColor={{ false: "#d4d4d4", true: "#CE3630" }}
              thumbColor="#ffffff"
            />
          </View>

          <Button onPress={handleEmailLogin} disabled={loading} className="mb-3">
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          <View className="flex-row items-center my-4">
            <Separator className="flex-1" />
            <Text className="mx-3 text-sm text-muted-foreground">또는</Text>
            <Separator className="flex-1" />
          </View>

          <Button
            variant="outline"
            onPress={handleTelegramLogin}
            className="mb-6"
          >
            Telegram으로 로그인
          </Button>

          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-muted-foreground">계정이 없으신가요? </Text>
            <Text
              className="text-sm font-medium text-primary"
              onPress={() => router.push("/(auth)/signup")}
            >
              회원가입
            </Text>
          </View>

          {isDevMode && (
            <View className="mt-6 border border-dashed border-muted-foreground/30 rounded-xl p-3">
              {}
              <View className="flex-row gap-2 mb-2">
                <Pressable
                  className={`flex-1 rounded-lg px-3 py-2 items-center ${serverMode === "local" ? "bg-amber-500" : "bg-secondary/50"}`}
                  onPress={async () => { await setServerMode("local"); setServerModeState("local"); }}
                >
                  <Text className={`text-xs font-bold ${serverMode === "local" ? "text-white" : "text-muted-foreground"}`}>LOCAL</Text>
                </Pressable>
                <Pressable
                  className={`flex-1 rounded-lg px-3 py-2 items-center ${serverMode === "remote" ? "bg-green-500" : "bg-secondary/50"}`}
                  onPress={async () => { await setServerMode("remote"); setServerModeState("remote"); }}
                >
                  <Text className={`text-xs font-bold ${serverMode === "remote" ? "text-white" : "text-muted-foreground"}`}>REMOTE</Text>
                </Pressable>
              </View>
              <Text className="text-xs font-mono text-center text-muted-foreground mb-2" selectable>
                {getBaseUrl()}
              </Text>

              <Text className="text-xs text-muted-foreground text-center mb-2">DEV 빠른 로그인</Text>
              <View className="flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => { setEmail("email@example.com"); setPassword("1234"); }}
                >
                  <Text className="text-sm font-medium text-foreground">사용자</Text>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => { setEmail("oth-test@example.invalid"); setPassword("1234"); }}
                >
                  <Text className="text-sm font-medium text-foreground">상점</Text>
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
