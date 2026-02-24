import React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from './button';

export function Label({ className, children, ...props }: TextProps) {
    return (
        <Text
            className={cn(
                "text-base font-medium leading-none text-foreground mb-2",
                className
            )}
            {...props}
        >
            {children}
        </Text>
    );
}
