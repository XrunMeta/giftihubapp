import React from "react";
import { ScrollView, Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  label: string;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (key: string) => void;
  className?: string;
}

export function ScrollableTabs({ tabs, activeTab, onTabPress, className }: ScrollableTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
      contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={{ alignSelf: "flex-start" }}
            className={cn(
              "rounded-full px-4 py-2",
              isActive ? "bg-primary" : "bg-secondary",
            )}
          >
            <Text
              className={cn(
                "text-sm font-medium",
                isActive ? "text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
