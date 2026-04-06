import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_d1d90c } from "rkmroqyctko";
import { v_51bb20, v_1ddb60 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_f40fc5() {
  const v_904d46 = v_d1d90c();
  const { t: v_8d41d7 } = v_678659();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <Text className="text-2xl font-bold text-foreground">{v_8d41d7("auth.signup.title")}</Text>
          <Text className="text-sm text-muted-foreground mt-1">{v_8d41d7("auth.signup.subtitle")}</Text>
        </View>

        <View className="gap-4">
          <Button
            onPress={() => v_904d46.push("/(auth)/oth-path-signup")}
            className="h-16 flex-row gap-3"
          >
            <User size={24} color="#fff" />
            <Text className="text-lg font-semibold text-primary-foreground">{v_8d41d7("auth.signup.asUser")}</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => v_904d46.push("/(auth)/merchant-signup")}
            className="h-16 flex-row gap-3"
          >
            <Store size={24} color="#0a0a0a" />
            <Text className="text-lg font-semibold text-foreground">{v_8d41d7("auth.signup.asMerchant")}</Text>
          </Button>
        </View>

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-sm text-muted-foreground">{v_8d41d7("auth.signup.hasAccount")}</Text>
          <Text
            className="text-sm font-medium text-primary"
            onPress={() => v_904d46.back()}
          >
            {v_8d41d7("auth.signup.login")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
