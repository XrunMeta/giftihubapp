import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, showBack = true, rightAction, className }: PageHeaderProps) {
  const router = useRouter();

  return (
    <View className={cn("flex-row items-center justify-between px-4 py-3", className)}>
      <View className="flex-row items-center flex-1">
        {showBack && (
          <Pressable onPress={() => router.back()} className="mr-2 p-1">
            <ChevronLeft size={24} color="#0a0a0a" />
          </Pressable>
        )}
        <Text className="text-lg font-semibold text-foreground" numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
}
