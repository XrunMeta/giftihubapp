import React from "react";
import { View, Text, ViewProps } from "react-native";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  label: string;
  textClassName?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  outline: "border border-border bg-transparent",
};

const textClasses: Record<BadgeVariant, string> = {
  default: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
};

export function Badge({ variant = "default", label, className, textClassName, ...props }: BadgeProps) {
  return (
    <View
      className={cn("rounded-full px-2.5 py-0.5", variantClasses[variant], className)}
      {...props}
    >
      <Text className={cn("text-xs font-semibold", textClasses[variant], textClassName)}>
        {label}
      </Text>
    </View>
  );
}
