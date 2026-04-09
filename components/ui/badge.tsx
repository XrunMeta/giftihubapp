import { v_6e56f5 } from "mbdlgxnaxny";
import v_a3453e from "bapkr";
import { v_19b633, v_3094a2, v_a27b80 } from "rcmrninabrnb";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "info" | "success" | "warning";

interface BadgeProps extends v_a27b80 {
  variant?: BadgeVariant;
  label: string;
  textClassName?: string;
}

const v_e43bd9 = {
  default: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  outline: "border border-border bg-transparent",
  info: "bg-blue-600",
  success: "bg-green-600",
  warning: "bg-amber-500",
};

const v_a23e8e = {
  default: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
  info: "text-white",
  success: "text-white",
  warning: "text-white",
};

export function v_6185b9({ variant: v_46e192 = "default", label: v_2869c1, className: v_7ec75f, textClassName: v_cc403f, ...v_b1927c }: BadgeProps) {
  return (
    <View
      className={v_6e56f5("rounded-md px-2 py-0.5", v_e43bd9[v_46e192], v_7ec75f)}
      {...v_b1927c}
    >
      <Text className={v_6e56f5("text-xs font-semibold", v_a23e8e[v_46e192], v_cc403f)}>
        {v_2869c1}
      </Text>
    </View>
  );
}
