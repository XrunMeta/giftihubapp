import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { register } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserSignupScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert(t("auth.userSignup.alertFieldTitle"), t("auth.userSignup.alertFieldBody"));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t("auth.userSignup.alertMismatchTitle"), t("auth.userSignup.alertMismatchBody"));
      return;
    }
    setLoading(true);
    try {
      const res = await register(email, password, name);
      await login(res.token, res.user);
      Alert.alert(t("auth.userSignup.alertSuccessTitle"), t("auth.userSignup.alertSuccessBody"), [
        { text: t("auth.userSignup.ok"), onPress: () => router.replace("/(user)/store") },
      ]);
    } catch (err: any) {
      Alert.alert(t("auth.userSignup.alertFailTitle"), err.body?.error || t("auth.userSignup.alertFailBody"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("auth.userSignup.title")} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.userSignup.name")}</Text>
              <Input placeholder={t("auth.userSignup.namePh")} value={name} onChangeText={setName} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.userSignup.email")}</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={t("auth.userSignup.emailPh")}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.userSignup.password")}</Text>
              <Input secureTextEntry placeholder={t("auth.userSignup.passwordPh")} value={password} onChangeText={setPassword} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{t("auth.userSignup.confirmPassword")}</Text>
              <Input secureTextEntry placeholder={t("auth.userSignup.confirmPasswordPh")} value={confirmPassword} onChangeText={setConfirmPassword} />
            </View>
          </View>

          <Button onPress={handleSignup} disabled={loading} className="mt-8">
            {loading ? t("auth.userSignup.submitting") : t("auth.userSignup.submit")}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
