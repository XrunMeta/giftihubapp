import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { cn } from './button';

export const Input = React.forwardRef<TextInput, TextInputProps>(
    ({ className, placeholderTextColor = '#737373', ...props }, ref) => {
        return (
            <TextInput
                ref={ref}
                className={cn(
                    "flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-base text-foreground placeholder:text-muted-foreground",
                    "focus:border-ring focus:border-2",
                    className
                )}
                placeholderTextColor={placeholderTextColor}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';
