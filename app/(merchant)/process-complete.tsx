import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_d1d90c } from "rkmroqyctko";
import { v_24c64e } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_19b633 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_63ad22() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
      <CheckCircle size={80} color="#22c55e" />
      <Text className="text-2xl font-bold text-foreground mt-6">{v_8d41d7("merchant.processComplete.title")}</Text>
      <Text className="text-sm text-muted-foreground mt-2 text-center">
        {v_8d41d7("merchant.processComplete.body")}
      </Text>
      <Button className="w-full mt-8" onPress={() => v_904d46.replace("/(merchant)")}>
        {v_8d41d7("merchant.processComplete.home")}
      </Button>
    </SafeAreaView>
  );
}
