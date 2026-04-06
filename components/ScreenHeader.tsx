import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DEFAULT_SEARCH_PLACEHOLDER = "브랜드 또는 상품명 검색";

export type ScreenHeaderSearchProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export type ScreenHeaderProps = {
  title: string;

  subtitle?: React.ReactNode;

  trailing?: React.ReactNode;
  search?: ScreenHeaderSearchProps;

  bottom?: React.ReactNode;

  elevated?: boolean;
  className?: string;

  titleRowClassName?: string;
};

export function ScreenHeader({
  title,
  subtitle,
  trailing,
  search,
  bottom,
  elevated = false,
  className,
  titleRowClassName,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  const body = (
    <>
      <View
        className={cn(
          "px-4 py-3 flex-row items-center justify-between gap-2",
          titleRowClassName,
        )}
      >
        <View className="flex-1 min-w-0">
          <Text className="text-2xl font-bold text-foreground" numberOfLines={1}>
            {title}
          </Text>
          {subtitle}
        </View>
        {trailing ? <View className="shrink-0">{trailing}</View> : null}
      </View>

      {search ? (
        <View className="px-4 mb-3">
          <View className="flex-row items-center bg-secondary rounded-lg px-3">
            <Search size={18} color="#737373" />
            <Input
              className="flex-1 border-0 bg-transparent text-md"
              placeholder={search.placeholder ?? DEFAULT_SEARCH_PLACEHOLDER}
              placeholderTextColor="#737373"
              value={search.value}
              onChangeText={search.onChangeText}
            />
          </View>
        </View>
      ) : null}

      {bottom}
    </>
  );

  if (elevated) {
    return (
      <View
        className={cn("bg-white border-b border-border mb-3", className)}
        style={{ paddingTop: insets.top }}
      >
        {body}
      </View>
    );
  }
  return <View className={className}>{body}</View>;
}
