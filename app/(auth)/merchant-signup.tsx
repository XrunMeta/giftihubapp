import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { register } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function MerchantSignupScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const alert = useAlertShim();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !businessName) {
      alert(t("auth.merchantSignup.alertFieldTitle"), t("auth.merchantSignup.alertFieldBody"));
      return;
    }
    setLoading(true);
    try {
      const res = await register(email, password, `${businessName} (${name})`);
      await login(res.token, res.user);
      alert(t("auth.merchantSignup.alertSuccessTitle"), t("auth.merchantSignup.alertSuccessBody"), [
        { text: t("auth.merchantSignup.ok"), onPress: () => router.replace("/(merchant)") },
      ]);
    } catch (err: any) {
      alert(t("auth.merchantSignup.alertFailTitle"), err.body?.error || t("auth.merchantSignup.alertFailBody"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("auth.merchantSignup.title")} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.merchantSignup.businessName")}</Text>
              <Input placeholder={t("auth.merchantSignup.businessNamePh")} value={businessName} onChangeText={setBusinessName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.merchantSignup.ownerName")}</Text>
              <Input placeholder={t("auth.merchantSignup.ownerNamePh")} value={name} onChangeText={setName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.merchantSignup.email")}</Text>
              <Input keyboardType="email-address" autoCapitalize="none" placeholder={t("auth.merchantSignup.emailPh")} value={email} onChangeText={setEmail} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.merchantSignup.password")}</Text>
              <Input secureTextEntry placeholder={t("auth.merchantSignup.passwordPh")} value={password} onChangeText={setPassword} />
            </View>
          </View>

          <Button onPress={handleSignup} disabled={loading} className="mt-8">
            {loading ? t("auth.merchantSignup.submitting") : t("auth.merchantSignup.submit")}
          </Button>

          <Text className="text-xs text-muted-foreground text-center mt-4">
            {t("auth.merchantSignup.footnote")}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
