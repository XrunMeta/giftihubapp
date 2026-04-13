import { cn } from "@/lib/utils";
import { router as globalRouter, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  className?: string;

  onBack?: () => void;

  fallbackHref?: string;
}

export function PageHeader({ title, showBack = true, onBackPress, onBack, rightAction, className, fallbackHref }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace((fallbackHref ?? "/(user)") as any);
    }
  };

  return (
    <View className={cn("flex-row items-center justify-between px-4 py-3", className)}>
      <View className="flex-row items-center flex-1">
        {showBack && (
          <Pressable onPress={handleBack} className="mr-2 p-1">
            <ChevronLeft size={24} color="#0a0a0a" />
          </Pressable>
        )}
        <Text className="text-2xl font-semibold text-foreground" numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
}
