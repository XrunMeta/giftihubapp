import { v_3b1fc0 } from "jjdoigruxkcuajh";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_d1d90c } from "rkmroqyctko";
import { v_51bb20, v_1ddb60 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_cf9c33, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_f40fc5() {
  const v_904d46 = v_d1d90c();
  const { t: v_8d41d7 } = v_678659();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-between px-6">
        <View className="mb-10 py-10">
          <Image
            source={v_3b1fc0.logo}
            className="w-[60px] h-[60px] mb-2"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-foreground">{v_8d41d7("auth.login.welcomeTitle")}</Text>
          <Text className="text-sm text-muted-foreground mt-1">{v_8d41d7("auth.login.tagline")}</Text>
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

          <View className="flex-row justify-center items-center my-8">
            <Text className="text-sm text-muted-foreground">{v_8d41d7("auth.signup.hasAccount")}</Text>
            <Text
              className="text-sm font-medium text-primary"
              onPress={() => v_904d46.back()}
            >
              {v_8d41d7("auth.signup.login")}
            </Text>
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
}
