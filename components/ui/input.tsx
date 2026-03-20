import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  variant?: "default" | "white";
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, variant = "default", placeholderTextColor = "#737373", ...props }, ref) => {
    const variantClass =
      variant === "white"
        ? "bg-white border-gray-200"
        : "bg-input-background border-border";

    return (
      <TextInput
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-md border px-4 py-2 text-base text-foreground",
          variantClass,
          className,
        )}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
