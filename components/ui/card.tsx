import v_a3453e from 'bapkr';
import { v_3094a2, v_19b633, v_a27b80, v_1c94f1 } from 'rcmrninabrnb';
import { v_6e56f5 } from './button';

export function v_2dc782({ className: v_7ec75f, ...v_b1927c }: v_a27b80) {
    return (
        <View
            className={v_6e56f5(
                "rounded-xl border border-border bg-card shadow-sm",
                v_7ec75f
            )}
            {...v_b1927c}
        />
    );
}

export function v_6a2c3c({ className: v_7ec75f, ...v_b1927c }: v_a27b80) {
    return (
        <View
            className={v_6e56f5("flex flex-col space-y-1.5 p-6", v_7ec75f)}
            {...v_b1927c}
        />
    );
}

export function v_5f0914({ className: v_7ec75f, ...v_b1927c }: v_1c94f1) {
    return (
        <Text
            className={v_6e56f5(
                "text-2xl font-semibold leading-none tracking-tight text-card-foreground",
                v_7ec75f
            )}
            {...v_b1927c}
        />
    );
}

export function v_5a8798({ className: v_7ec75f, ...v_b1927c }: v_1c94f1) {
    return (
        <Text
            className={v_6e56f5("text-sm text-muted-foreground", v_7ec75f)}
            {...v_b1927c}
        />
    );
}

export function v_e7d43c({ className: v_7ec75f, ...v_b1927c }: v_a27b80) {
    return <View className={v_6e56f5("p-6 pt-0", v_7ec75f)} {...v_b1927c} />;
}

export function v_21cbe4({ className: v_7ec75f, ...v_b1927c }: v_a27b80) {
    return (
        <View
            className={v_6e56f5("flex flex-row items-center p-6 pt-0", v_7ec75f)}
            {...v_b1927c}
        />
    );
}
