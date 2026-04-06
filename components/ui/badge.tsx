import { cn } from "@/lib/utils";
import React from "react";
import { Text, View, ViewProps } from "react-native";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "info" | "success";

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
  info: "bg-blue-600",
  success: "bg-green-600",
};

const textClasses: Record<BadgeVariant, string> = {
  default: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
  info: "text-white",
  success: "text-white",
};

export function Badge({ variant = "default", label, className, textClassName, ...props }: BadgeProps) {
  return (
    <View
      className={cn("rounded-md px-2 py-0.5", variantClasses[variant], className)}
      {...props}
    >
      <Text className={cn("text-xs font-semibold", textClasses[variant], textClassName)}>
        {label}
      </Text>
    </View>
  );
}
