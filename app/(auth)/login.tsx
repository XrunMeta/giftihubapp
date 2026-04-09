import { images } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useDevMode } from "@/hooks/use-dev-mode";
import { getBaseUrl, getRememberMe, getSavedEmail, getServerMode, removeSavedEmail, setRememberMe, setSavedEmail, setServerMode } from "@/services/api";
import { loginWithEmail } from "@/services/auth";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useI18n();
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
      Alert.alert(t("auth.login.alertInputTitle"), t("auth.login.alertInputBody"));
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
      Alert.alert(t("auth.login.alertFailTitle"), err.body?.error || t("auth.login.alertFailBody"));
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
            Alert.alert(t("auth.login.alertTokenTitle"), t("auth.login.alertTokenBody"));
          }
        }
      }
    } catch {
      Alert.alert(t("auth.login.alertTelegramTitle"), t("auth.login.alertTelegramBody"));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "space-between" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-start mb-8 flex-grow-1">
            <Image
              source={images.logo}
              className="w-[60px] h-[60px] mb-2"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-foreground">{t("auth.login.welcomeTitle")}</Text>
            <Text className="text-sm text-muted-foreground mt-1">{t("auth.login.tagline")}</Text>
          </View>

          <View >
            <View className="mb-4">
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.login.email")}</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={t("auth.login.emailPh")}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.login.password")}</Text>
              <Input
                secureTextEntry
                placeholder={t("auth.login.passwordPh")}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-sm text-muted-foreground">{t("auth.login.rememberMe")}</Text>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMeState}
                trackColor={{ false: "#d4d4d4", true: "#D33932" }}
                thumbColor="#ffffff"
              />
            </View>

            <Button onPress={handleEmailLogin} disabled={loading} className="mb-3">
              {loading ? t("auth.login.loggingIn") : t("auth.login.login")}
            </Button>

            <View className="flex-row items-center my-4">
              <Separator className="flex-1" />
              <Text className="mx-3 text-sm text-muted-foreground">{t("auth.login.or")}</Text>
              <Separator className="flex-1" />
            </View>

            <Button
              variant="outline"
              onPress={handleTelegramLogin}
              className="mb-6"
            >
              {t("auth.login.telegramLogin")}
            </Button>

            <View className="flex-row justify-center items-center">
              <Text className="text-sm text-muted-foreground">{t("auth.login.noAccount")}</Text>
              <Text
                className="text-sm font-medium text-primary"
                onPress={() => router.push("/(auth)/signup")}
              >
                {t("auth.login.signup")}
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

                <Text className="text-xs text-muted-foreground text-center mb-2">{t("auth.login.devQuickLogin")}</Text>
                <View className="flex-row gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onPress={() => { setEmail("email@example.com"); setPassword("1234"); }}
                  >
                    <Text className="text-sm font-medium text-foreground">{t("auth.login.devUser")}</Text>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onPress={() => { setEmail("oth-test@example.invalid"); setPassword("1234"); }}
                  >
                    <Text className="text-sm font-medium text-foreground">{t("auth.login.devMerchant")}</Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
