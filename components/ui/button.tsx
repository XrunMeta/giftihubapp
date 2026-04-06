import { v_6e56f5 } from "mbdlgxnaxny";
import v_a3453e from "bapkr";
import { v_19b633, v_4623af, v_629153 } from "rcmrninabrnb";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends v_629153 {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  children: v_a3453e.ReactNode;
}

const v_e43bd9 = {
  default: "bg-primary",
  destructive: "bg-destructive",
  outline: "border border-border bg-gray-50",
  secondary: "bg-secondary",
  ghost: "bg-transparent",
  link: "bg-transparent",
};

const v_956f88 = {
  default: "h-[48px] px-6",
  sm: "h-9 rounded-md px-3",
  lg: "h-12 rounded-md px-8",
  icon: "h-10 w-10",
};

const v_57b3cb = {
  default: "text-primary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
  secondary: "text-secondary-foreground",
  ghost: "text-foreground",
  link: "text-primary underline",
};

const v_f4dd19 = {
  default: "text-[16px] font-medium",
  sm: "text-sm font-medium",
  lg: "text-lg font-medium",
  icon: "text-base",
};

export function v_1a40c4({
  variant: v_46e192 = "default",
  size: v_05b441 = "default",
  className: v_7ec75f,
  textClassName: v_cc403f,
  children: v_21f619,
  disabled: v_4a6533,
  ...v_b1927c
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={v_6e56f5(
        "flex flex-row items-center justify-center rounded-lg",
        v_e43bd9[v_46e192],
        v_956f88[v_05b441],
        v_4a6533 && "opacity-50",
        v_7ec75f,
      )}
      disabled={v_4a6533}
      {...v_b1927c}
    >
      {typeof v_21f619 === "string" ? (
        <Text
          className={v_6e56f5(
            v_57b3cb[v_46e192],
            v_f4dd19[v_05b441],
            v_cc403f,
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
