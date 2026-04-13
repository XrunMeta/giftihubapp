import { v_6e56f5 } from "mbdlgxnaxny";
import v_a3453e from "bapkr";
import {
  v_94c965,
  v_326be8,
  v_09d0e5,
  v_19b633,
  v_bfa1d6,
  v_3094a2,
  type v_a27b80,
} from "rcmrninabrnb";

if (v_326be8.OS === "android" && v_bfa1d6.setLayoutAnimationEnabledExperimental) {
  v_bfa1d6.setLayoutAnimationEnabledExperimental(true);
}

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = Omit<v_a27b80, "children"> & {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

const v_efd0c1 = v_326be8.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: { elevation: 2 },
  default: {},
});

export function v_b34ce5<T extends string>({
  options: v_b36f96,
  value: v_3b402b,
  onChange: v_b187d9,
  className: v_7ec75f,
  ...v_83bbcd
}: SegmentedControlProps<T>) {
  return (
    <View
      className={v_6e56f5("flex-row overflow-hidden rounded-2xl bg-[#EFEFF0] p-1", v_7ec75f)}
      {...v_83bbcd}
    >
      {v_b36f96.map((v_68b2be) => {
        const v_587413 = v_3b402b === v_68b2be.value;
        return (
          <Pressable
            key={String(v_68b2be.value)}
            className="min-w-0 flex-1"
            onPress={() => {
              if (v_68b2be.value === v_3b402b) return;
              v_94c965.configureNext(v_94c965.Presets.easeInEaseOut);
              v_b187d9(v_68b2be.value);
            }}
          >
            <View
              className={v_6e56f5(
                "items-center justify-center py-2.5",
                v_587413 && "rounded-2xl bg-white",
              )}
              style={v_587413 ? v_efd0c1 : undefined}
            >
              <Text className="text-center text-md font-semibold text-foreground" numberOfLines={1}>
                {v_68b2be.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
