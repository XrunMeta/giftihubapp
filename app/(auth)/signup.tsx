import { images } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";
import { Store, User } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-between px-6">
        <View className="mb-10 py-10">
          <Image
            source={images.logo}
            className="w-[60px] h-[60px] mb-2"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-foreground">{t("auth.login.welcomeTitle")}</Text>
          <Text className="text-sm text-muted-foreground mt-1">{t("auth.login.tagline")}</Text>
        </View>

        <View className="gap-4">
          <Button
            onPress={() => router.push("/(auth)/oth-path-signup")}
            className="h-16 flex-row gap-3"
          >
            <User size={24} color="#fff" />
            <Text className="text-lg font-semibold text-primary-foreground">{t("auth.signup.asUser")}</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => router.push("/(auth)/merchant-signup")}
            className="h-16 flex-row gap-3"
          >
            <Store size={24} color="#0a0a0a" />
            <Text className="text-lg font-semibold text-foreground">{t("auth.signup.asMerchant")}</Text>
          </Button>

          <View className="flex-row justify-center items-center my-8">
            <Text className="text-sm text-muted-foreground">{t("auth.signup.hasAccount")}</Text>
            <Text
              className="text-sm font-medium text-primary"
              onPress={() => router.back()}
            >
              {t("auth.signup.login")}
            </Text>
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
}
