import "../global.css";
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { DevModeContext, useDevModeProvider } from "@/hooks/use-dev-mode";
import { applyPretendardTextDefaults, pretendardFontMap } from "@/lib/pretendard";
import { initBaseUrl } from "@/services/api";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const devMode = useDevModeProvider();
  const [fontsLoaded, fontError] = useFonts(pretendardFontMap);

  useEffect(() => {
    initBaseUrl();
  }, []);

  const rootBackground = colorScheme === "dark" ? "#0a0a0a" : "#ffffff";
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(rootBackground);
  }, [rootBackground]);

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;
    if (fontsLoaded) applyPretendardTextDefaults();
    SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: rootBackground }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <DevModeContext.Provider value={devMode}>
          <AuthProvider>
            <CartProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(user)" />
                <Stack.Screen name="(merchant)" />
              </Stack>
            </CartProvider>
          </AuthProvider>
        </DevModeContext.Provider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
