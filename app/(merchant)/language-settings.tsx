import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_48dd6f, v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_3ebb07 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e from "bapkr";
import { v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_5ed7d3() {
  const { locale: v_6f298b, setLocale: v_1e48df, t: v_8d41d7 } = v_678659();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("settings.language")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="text-sm text-muted-foreground mb-4">{v_8d41d7("settings.languageHint")}</Text>
        <View className="bg-card rounded-xl border border-border overflow-hidden">
          {v_48dd6f.map((v_68b2be, v_a56041) => {
            const v_587413 = v_6f298b === v_68b2be.code;
            return (
              <View key={v_68b2be.code}>
                {v_a56041 > 0 ? <View className="h-px bg-border mx-4" /> : null}
                <Pressable
                  className={`flex-row items-center justify-between px-4 py-4 ${v_587413 ? "bg-primary/5" : ""}`}
                  onPress={() => v_1e48df(v_68b2be.code)}
                >
                  <Text className={`text-base ${v_587413 ? "font-semibold text-primary" : "text-foreground"}`}>
                    {v_68b2be.nativeName}
                  </Text>
                  {v_587413 ? <Check size={22} color="#CE3630" /> : null}
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
