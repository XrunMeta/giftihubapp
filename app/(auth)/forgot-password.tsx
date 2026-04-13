import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const alert = useAlertShim();
  const { login } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (countdown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown]);

  const handleSendOtp = useCallback(async () => {
    if (!email.trim()) {
      alert(t("auth.login.alertInputTitle"), t("auth.forgotPasswordEmailRequired"));
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
        skipAuth: true,
      });
      setStep(2);
      setCountdown(60);
      setTimeout(() => otpInputRef.current?.focus(), 300);
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), err?.body?.error || t("auth.forgotPasswordFail"));
    } finally {
      setLoading(false);
    }
  }, [email, alert, t]);

  const handleVerifyOtp = useCallback(async () => {
    if (code.length !== 6) return;
    setLoading(true);
    try {
      const res = await apiFetch<{ token: string; user: { id: string; name: string; role: "user" | "merchant" } }>(
        "/oth-path",
        {
          method: "POST",
          body: JSON.stringify({ email: email.trim(), code }),
          skipAuth: true,
        },
      );
      await login(res.token, res.user);
      const dest = res.user.role === "merchant" ? "/(merchant)" : "/(user)/store";
      router.replace(dest);
    } catch (err: any) {
      const body = err?.body as { error?: string; remaining_attempts?: number } | null;
      const msg = body?.error || t("auth.verifyOtpFail");
      const remaining = body?.remaining_attempts;
      const detail = remaining != null ? `${msg} (${t("auth.remainingAttempts").replace("{{count}}", String(remaining))})` : msg;
      alert(t("settings.profile.failTitle"), detail);
    } finally {
      setLoading(false);
    }
  }, [code, email, alert, t, login, router]);

  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    setLoading(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
        skipAuth: true,
      });
      setCountdown(60);
      setCode("");
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), err?.body?.error || t("auth.forgotPasswordFail"));
    } finally {
      setLoading(false);
    }
  }, [countdown, email, alert, t]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <PageHeader title={t("auth.forgotPasswordTitle")} fallbackHref="/(auth)/login" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && (
            <View className="mt-4">
              <Text className="text-sm text-muted-foreground mb-4">{t("auth.forgotPasswordHint")}</Text>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.login.email")}</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={t("auth.login.emailPh")}
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
              <Button onPress={handleSendOtp} disabled={loading} className="mt-4">
                {loading ? t("settings.profile.saving") : t("auth.sendOtp")}
              </Button>
            </View>
          )}

          {step === 2 && (
            <View className="mt-4">
              <Text className="text-sm text-muted-foreground mb-4">
                {t("auth.otpSent").replace("{{email}}", email.trim())}
              </Text>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.otpPlaceholder")}</Text>
              <TextInput
                ref={otpInputRef}
                keyboardType="number-pad"
                maxLength={6}
                value={code}
                onChangeText={setCode}
                className="bg-white border border-border rounded-lg px-4 py-3 text-foreground text-2xl text-center tracking-[12px] font-mono"
                placeholderTextColor="#999"
                placeholder="000000"
                editable={!loading}
              />
              <Button onPress={handleVerifyOtp} disabled={loading || code.length !== 6} className="mt-4">
                {loading ? t("settings.profile.saving") : t("auth.verifyOtp")}
              </Button>

              <View className="mt-4 items-center">
                {countdown > 0 ? (
                  <Text className="text-sm text-muted-foreground">
                    {t("auth.resendWait").replace("{{seconds}}", String(countdown))}
                  </Text>
                ) : (
                  <Text className="text-sm text-primary" onPress={handleResend}>
                    {t("auth.resendOtp")}
                  </Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
