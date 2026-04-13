import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e from "bapkr";
import { v_f2c756, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_bbbd2b() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("patentNotice.pageTitle")} onBackPress={() => v_904d46.navigate("/(user)/mypage")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 48 }}>
        {}
        <Text className="text-base font-bold text-foreground mb-2">
          {v_8d41d7("patentNotice.heading")}
        </Text>
        <Text className="text-sm text-muted-foreground leading-5 mb-4">
          {v_8d41d7("patentNotice.greeting")}
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-6">
          {v_8d41d7("patentNotice.intro")}
        </Text>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {v_8d41d7("patentNotice.section1Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-4">
            {v_8d41d7("patentNotice.section1Desc")}
          </Text>

          <View className="bg-gray-50 rounded-lg p-3 mb-3">
            <Text className="text-sm font-bold text-primary mb-1">
              {v_8d41d7("patentNotice.patent1No")}
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              {v_8d41d7("patentNotice.patent1Name")}
            </Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-sm font-bold text-primary mb-1">
              {v_8d41d7("patentNotice.patent2No")}
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              {v_8d41d7("patentNotice.patent2Name")}
            </Text>
          </View>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {v_8d41d7("patentNotice.section2Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            {v_8d41d7("patentNotice.section2Body1")}
          </Text>
          <Text className="text-sm text-foreground leading-5">
            {v_8d41d7("patentNotice.section2Body2")}
          </Text>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {v_8d41d7("patentNotice.section3Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            {v_8d41d7("patentNotice.section3Body")}
          </Text>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("patentNotice.contactLabel")}</Text>
            <Pressable onPress={() => v_f2c756.openURL("mailto:oth-staff@example.invalid")}>
              <Text className="text-sm font-semibold text-primary underline">
                oth-staff@example.invalid
              </Text>
            </Pressable>
            <Text className="text-xs text-muted-foreground mt-2 leading-4">
              {v_8d41d7("patentNotice.contactNote")}
            </Text>
          </View>
        </View>

        {}
        <Text className="text-sm text-foreground leading-5 mb-2">
          {v_8d41d7("patentNotice.closing1")}
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-2">{v_8d41d7("patentNotice.closing2")}</Text>
        <Text className="text-sm font-semibold text-foreground">{v_8d41d7("patentNotice.closingSign")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
