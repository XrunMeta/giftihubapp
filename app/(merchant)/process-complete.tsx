import v_a3453e from "bapkr";
import { v_3094a2, v_19b633 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_24c64e } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";

export default function v_63ad22() {
  const v_904d46 = v_d1d90c();

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      <CheckCircle size={80} color="#22c55e" />
      <Text className="text-2xl font-bold text-foreground mt-6">사용 완료!</Text>
      <Text className="text-sm text-muted-foreground mt-2 text-center">
        바우처가 정상적으로 사용 처리되었습니다.
      </Text>
      <Button className="w-full mt-8" onPress={() => v_904d46.replace("/(merchant)")}>
        홈으로 돌아가기
      </Button>
    </SafeAreaView>
  );
}
