import v_a3453e from 'bapkr';
import { v_4623af, v_19b633, v_629153, v_3094a2 } from 'rcmrninabrnb';
import { v_105ba3, type v_e51b5d } from 'bdav';
import { v_3bf98a } from 'jqmjlvfyawvhfp';

export function v_6e56f5(...v_b50631: v_e51b5d[]) {
    return v_3bf98a(v_105ba3(v_b50631));
}

interface ButtonProps extends v_629153 {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
    textClassName?: string;
    children: v_a3453e.ReactNode;
}

export function v_1a40c4({
    variant: v_46e192 = 'default',
    size: v_05b441 = 'default',
    className: v_7ec75f,
    textClassName: v_cc403f,
    children: v_21f619,
    disabled: v_4a6533,
    ...v_b1927c
}: ButtonProps) {
    const v_8e9dec = "flex flex-row items-center justify-center rounded-lg";

    const v_e43bd9 = {
        default: "bg-primary",
        outline: "border border-input bg-background",
        ghost: "bg-transparent",
    };

    const v_956f88 = {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
    };

    const v_57b3cb = {
        default: "text-primary-foreground",
        outline: "text-foreground",
        ghost: "text-foreground",
    };

    const v_f4dd19 = {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className={v_6e56f5(
                v_8e9dec,
                v_e43bd9[v_46e192],
                v_956f88[v_05b441],
                v_4a6533 && "opacity-50",
                v_7ec75f
            )}
            disabled={v_4a6533}
            {...v_b1927c}
        >
            {typeof v_21f619 === 'string' ? (
                <Text
                    className={v_6e56f5(
                        v_57b3cb[v_46e192],
                        v_f4dd19[v_05b441],
                        v_cc403f
                    )}
                >
                    {v_21f619}
                </Text>
            ) : (
                v_21f619
            )}
        </TouchableOpacity>
    );
}
