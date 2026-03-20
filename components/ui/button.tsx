import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary",
  destructive: "bg-destructive",
  outline: "border border-border bg-background",
  secondary: "bg-secondary",
  ghost: "bg-transparent",
  link: "bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-6 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-12 rounded-md px-8",
  icon: "h-10 w-10",
};

const textVariantClasses: Record<ButtonVariant, string> = {
  default: "text-primary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
  secondary: "text-secondary-foreground",
  ghost: "text-foreground",
  link: "text-primary underline",
};

const textSizeClasses: Record<ButtonSize, string> = {
  default: "text-base font-medium",
  sm: "text-sm font-medium",
  lg: "text-lg font-medium",
  icon: "text-base",
};

export function Button({
  variant = "default",
  size = "default",
  className,
  textClassName,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "flex flex-row items-center justify-center rounded-lg",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            textVariantClasses[variant],
            textSizeClasses[size],
            textClassName,
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
