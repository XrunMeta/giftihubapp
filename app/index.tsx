import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash || isLoading) return;

    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    } else if (user?.role === "merchant") {
      router.replace("/(merchant)");
    } else {
      router.replace("/(user)/store");
    }
  }, [showSplash, isAuthenticated, isLoading, user]);

  if (showSplash) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Image
          source={require("../assets/images/splash-icon.png")}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />
        <View className="mt-8 items-center">
          <Text className="text-xs text-gray-400">특허 제10-1205894호</Text>
          <Text className="text-xs text-gray-400 mt-1">특허 제10-0561546호</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <ActivityIndicator size="large" color="#CE3630" />
    </View>
  );
}
