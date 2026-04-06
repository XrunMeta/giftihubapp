import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_d1d90c } from "rkmroqyctko";
import { v_51bb20, v_1ddb60 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_f40fc5() {
  const v_904d46 = v_d1d90c();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <Text className="text-2xl font-bold text-foreground">회원가입</Text>
          <Text className="text-sm text-muted-foreground mt-1">가입 유형을 선택해주세요</Text>
        </View>

        <View className="gap-4">
          <Button
            onPress={() => v_904d46.push("/(auth)/oth-path-signup")}
            className="h-16 flex-row gap-3"
          >
            <User size={24} color="#fff" />
            <Text className="text-lg font-semibold text-primary-foreground">사용자로 가입</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => v_904d46.push("/(auth)/merchant-signup")}
            className="h-16 flex-row gap-3"
          >
            <Store size={24} color="#0a0a0a" />
            <Text className="text-lg font-semibold text-foreground">가맹점으로 가입</Text>
          </Button>
        </View>

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-sm text-muted-foreground">이미 계정이 있으신가요? </Text>
          <Text
            className="text-sm font-medium text-primary"
            onPress={() => v_904d46.back()}
          >
            로그인
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
