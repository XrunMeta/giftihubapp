import { cn } from "@/lib/utils";
import React from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
  type ViewProps,
} from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = Omit<ViewProps, "children"> & {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

const selectedSegmentStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: { elevation: 2 },
  default: {},
});

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  ...rest
}: SegmentedControlProps<T>) {
  return (
    <View
      className={cn("flex-row overflow-hidden rounded-2xl bg-[#EFEFF0] p-1", className)}
      {...rest}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <Pressable
            key={String(opt.value)}
            className="min-w-0 flex-1"
            onPress={() => {
              if (opt.value === value) return;
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              onChange(opt.value);
            }}
          >
            <View
              className={cn(
                "items-center justify-center py-2.5",
                selected && "rounded-2xl bg-white",
              )}
              style={selected ? selectedSegmentStyle : undefined}
            >
              <Text className="text-center text-md font-semibold text-foreground" numberOfLines={1}>
                {opt.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
