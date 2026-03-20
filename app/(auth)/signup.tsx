import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Store } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { images } from "@/assets/images";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <Image source={images.logo} className="w-20 h-20 mb-4" resizeMode="contain" />
          <Text className="text-2xl font-bold text-foreground">회원가입</Text>
          <Text className="text-sm text-muted-foreground mt-1">가입 유형을 선택해주세요</Text>
        </View>

        <View className="gap-4">
          <Button
            onPress={() => router.push("/(auth)/oth-path-signup")}
            className="h-16 flex-row gap-3"
          >
            <User size={24} color="#fff" />
            <Text className="text-lg font-semibold text-primary-foreground">사용자로 가입</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => router.push("/(auth)/merchant-signup")}
            className="h-16 flex-row gap-3"
          >
            <Store size={24} color="#0a0a0a" />
            <Text className="text-lg font-semibold text-foreground">가맹점으로 가입</Text>
          </Button>
        </View>

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-sm text-muted-foreground">이미 계정이 있으신가요? </Text>
          <Text
            className="text-sm font-medium text-primary"
            onPress={() => router.back()}
          >
            로그인
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
