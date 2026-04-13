import { v_6e56f5 } from "mbdlgxnaxny";
import { v_904d46 as v_1cac93, v_d1d90c } from "rkmroqyctko";
import { v_c2fb26 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_09d0e5, v_19b633, v_3094a2 } from "rcmrninabrnb";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: v_a3453e.ReactNode;
  className?: string;

  onBack?: () => void;

  fallbackHref?: string;
}

export function v_258c1c({ title: v_9f1622, showBack: v_ea6f9c = true, onBackPress: v_f442f6, rightAction: v_4af61b, className: v_7ec75f }: PageHeaderProps) {
  const v_904d46 = v_d1d90c();

  const v_6ca26b = () => {
    if (v_f442f6) v_f442f6();
    else v_904d46.back();
  };

  return (
    <View className={v_6e56f5("flex-row items-center justify-between px-4 py-3", v_7ec75f)}>
      <View className="flex-row items-center flex-1">
        {v_ea6f9c && (
          <Pressable onPress={v_6ca26b} className="mr-2 p-1">
            <ChevronLeft size={24} color="#0a0a0a" />
          </Pressable>
        )}
        <Text className="text-2xl font-semibold text-foreground" numberOfLines={1}>
          {v_9f1622}
        </Text>
      </View>
      {v_4af61b && <View>{v_4af61b}</View>}
    </View>
  );
}
