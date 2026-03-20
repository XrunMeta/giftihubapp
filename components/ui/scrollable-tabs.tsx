import v_a3453e from "bapkr";
import { v_122070, v_09d0e5, v_19b633 } from "rcmrninabrnb";
import { v_6e56f5 } from "mbdlgxnaxny";

interface Tab {
  key: string;
  label: string;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (key: string) => void;
  className?: string;
}

export function v_a3b961({ tabs: v_c6c04c, activeTab: v_ac1d22, onTabPress: v_0c5f70, className: v_7ec75f }: ScrollableTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={v_7ec75f}
      contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
    >
      {v_c6c04c.map((v_11083e) => {
        const v_26dce6 = v_11083e.key === v_ac1d22;
        return (
          <Pressable
            key={v_11083e.key}
            onPress={() => v_0c5f70(v_11083e.key)}
            style={{ alignSelf: "flex-start" }}
            className={v_6e56f5(
              "rounded-full px-4 py-2",
              v_26dce6 ? "bg-primary" : "bg-secondary",
            )}
          >
            <Text
              className={v_6e56f5(
                "text-sm font-medium",
                v_26dce6 ? "text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {v_11083e.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
