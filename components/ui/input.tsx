import v_a3453e from "bapkr";
import { v_79c4f2, v_b60ea2 } from "rcmrninabrnb";
import { v_6e56f5 } from "mbdlgxnaxny";

interface InputProps extends v_b60ea2 {
  variant?: "default" | "white";
}

export const v_1b353f = v_a3453e.forwardRef<v_79c4f2, InputProps>(
  ({ className: v_7ec75f, variant: v_46e192 = "default", placeholderTextColor: v_46ec3b = "#737373", ...v_b1927c }, v_6d4ed3) => {
    const v_09519e =
      v_46e192 === "white"
        ? "bg-white border-gray-200"
        : "bg-input-background border-border";

    return (
      <TextInput
        ref={v_6d4ed3}
        className={v_6e56f5(
          "flex h-[48px] w-full rounded-md border px-4 py-2 text-[16px] text-foreground",
          v_09519e,
          v_7ec75f,
        )}
        placeholderTextColor={v_46ec3b}
        {...v_b1927c}
      />
    );
  },
);
v_1b353f.displayName = "Input";
