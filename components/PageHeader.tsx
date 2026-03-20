import v_a3453e from "bapkr";
import { v_3094a2, v_19b633, v_09d0e5 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_c2fb26 } from "wjvlskvsbzsrojdbjsl";
import { v_6e56f5 } from "mbdlgxnaxny";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: v_a3453e.ReactNode;
  className?: string;
}

export function v_258c1c({ title: v_9f1622, showBack: v_ea6f9c = true, rightAction: v_4af61b, className: v_7ec75f }: PageHeaderProps) {
  const v_904d46 = v_d1d90c();

  return (
    <View className={v_6e56f5("flex-row items-center justify-between px-4 py-3", v_7ec75f)}>
      <View className="flex-row items-center flex-1">
        {v_ea6f9c && (
          <Pressable onPress={() => v_904d46.back()} className="mr-2 p-1">
            <ChevronLeft size={24} color="#0a0a0a" />
          </Pressable>
        )}
        <Text className="text-lg font-semibold text-foreground" numberOfLines={1}>
          {v_9f1622}
        </Text>
      </View>
      {v_4af61b && <View>{v_4af61b}</View>}
    </View>
  );
}
