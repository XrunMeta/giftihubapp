import { v_6e56f5 } from "mbdlgxnaxny";
import { v_3ebb07 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_09d0e5, type v_23e1b6, v_3094a2 } from "rcmrninabrnb";

export interface CheckboxProps {
  checked: boolean;

  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  hitSlop?: v_23e1b6["hitSlop"];
}

export function v_0ddfa5({ checked: v_da90dc, onPress: v_719eed, disabled: v_4a6533, className: v_7ec75f, hitSlop: v_4a8a61 }: CheckboxProps) {
  const v_a38d42 = (
    <View
      className={v_6e56f5(
        "h-[22px] w-[22px] items-center justify-center rounded-md border",
        v_da90dc ? "border-primary bg-primary" : "border-neutral-300 bg-card",
        v_4a6533 && "opacity-50",
        v_7ec75f,
      )}
    >
      {v_da90dc ? <Check size={14} color="#ffffff" strokeWidth={2.5} /> : null}
    </View>
  );

  if (v_719eed) {
    return (
      <Pressable
        onPress={v_719eed}
        disabled={v_4a6533}
        hitSlop={v_4a8a61 ?? { top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: v_da90dc, disabled: !!v_4a6533 }}
        style={({ pressed: v_aba1d2 }) => (v_aba1d2 && !v_4a6533 ? { opacity: 0.7 } : undefined)}
      >
        {v_a38d42}
      </Pressable>
    );
  }

  return v_a38d42;
}
