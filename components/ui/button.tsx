import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
    textClassName?: string;
    children: React.ReactNode;
}

export function Button({
    variant = 'default',
    size = 'default',
    className,
    textClassName,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseClasses = "flex flex-row items-center justify-center rounded-lg";

    const variantClasses = {
        default: "bg-primary",
        outline: "border border-input bg-background",
        ghost: "bg-transparent",
    };

    const sizeClasses = {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
    };

    const textVariantClasses = {
        default: "text-primary-foreground",
        outline: "text-foreground",
        ghost: "text-foreground",
    };

    const textSizeClasses = {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                disabled && "opacity-50",
                className
            )}
            disabled={disabled}
            {...props}
        >
            {typeof children === 'string' ? (
                <Text
                    className={cn(
                        textVariantClasses[variant],
                        textSizeClasses[size],
                        textClassName
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
