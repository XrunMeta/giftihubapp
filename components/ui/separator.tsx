import v_a3453e from "bapkr";
import { v_3094a2, v_a27b80 } from "rcmrninabrnb";
import { v_6e56f5 } from "mbdlgxnaxny";

interface SeparatorProps extends v_a27b80 {
  orientation?: "horizontal" | "vertical";
}

export function v_474c83({ orientation: v_d8dc1f = "horizontal", className: v_7ec75f, ...v_b1927c }: SeparatorProps) {
  return (
    <View
      className={v_6e56f5(
        "bg-border",
        v_d8dc1f === "horizontal" ? "h-px w-full" : "h-full w-px",
        v_7ec75f,
      )}
      {...v_b1927c}
    />
  );
}
