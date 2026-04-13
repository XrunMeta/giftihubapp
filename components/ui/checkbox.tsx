import { cn } from "@/lib/utils";
import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, type PressableProps, View } from "react-native";

export interface CheckboxProps {
  checked: boolean;

  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  hitSlop?: PressableProps["hitSlop"];
}

export function Checkbox({ checked, onPress, disabled, className, hitSlop }: CheckboxProps) {
  const box = (
    <View
      className={cn(
        "h-[22px] w-[22px] items-center justify-center rounded-md border",
        checked ? "border-primary bg-primary" : "border-neutral-300 bg-card",
        disabled && "opacity-50",
        className,
      )}
    >
      {checked ? <Check size={14} color="#ffffff" strokeWidth={2.5} /> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={hitSlop ?? { top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: !!disabled }}
        style={({ pressed }) => (pressed && !disabled ? { opacity: 0.7 } : undefined)}
      >
        {box}
      </Pressable>
    );
  }

  return box;
}
