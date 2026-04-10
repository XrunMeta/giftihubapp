import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_a41961, v_2b01b0, type v_47e95e } from "pvulvehakmpzwkznlnd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_66816c, v_1ddb60 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_e662ae, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_cf9c33, v_09d0e5, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

export default function v_7f792b() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_7c5791, v_c57190] = v_5ab095("");
  const [v_a7f568, v_54074f] = v_5ab095<v_47e95e[]>([]);
  const [v_587413, v_2122dd] = v_5ab095<v_47e95e | null>(null);
  const [v_4568f9, v_58158a] = v_5ab095(false);
  const [v_683210, v_34a50a] = v_5ab095(false);
  const v_445b5f = v_e662ae<ReturnType<typeof setTimeout> | null>(null);

  const v_4722a6 = v_de06a3((v_ab6401) => {
    if (v_445b5f.current) clearTimeout(v_445b5f.current);
    if (v_ab6401.length < 2) {
      v_54074f([]);
      v_58158a(false);
      return;
    }
    v_58158a(true);
    v_445b5f.current = setTimeout(async () => {
      try {
        const v_8f00b9 = await v_a41961(v_ab6401);
        v_54074f(v_8f00b9.users);
      } catch {
        v_54074f([]);
      } finally {
        v_58158a(false);
      }
    }, 400);
  }, []);

  const v_6913b3 = (v_9b6134) => {
    v_c57190(v_9b6134);
    v_2122dd(null);
    v_4722a6(v_9b6134);
  };

  const v_6121dc = (user: v_47e95e) => {
    v_2122dd(v_625c74);
    v_c57190(v_625c74.name);
    v_54074f([]);
  };

  const v_eb5366 = async () => {
    if (!v_587413) {
      v_5c50c0(v_8d41d7("myGifti.transfer.alertEmptyTitle"), v_8d41d7("myGifti.transfer.selectUserFirst"));
      return;
    }
    v_5c50c0(
      v_8d41d7("myGifti.transfer.confirmTitle"),
      v_8d41d7("myGifti.transfer.confirmBodyUser")
        .replace("{{name}}", v_587413.name)
        .replace("{{email}}", v_587413.email_masked),
      [
        { text: v_8d41d7("myGifti.transfer.cancel"), style: "cancel" },
        {
          text: v_8d41d7("myGifti.transfer.transfer"),
          onPress: async () => {
            v_34a50a(true);
            try {
              await v_2b01b0(v_389afb!, v_587413.id);
              v_5c50c0(v_8d41d7("myGifti.transfer.doneTitle"), v_8d41d7("myGifti.transfer.doneBody"), [
                { text: v_8d41d7("myGifti.transfer.ok"), onPress: () => v_904d46.replace("/(user)/oth-path") },
              ]);
            } catch (v_49263d) {
              v_5c50c0(v_8d41d7("myGifti.transfer.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.transfer.failBody"));
            } finally {
              v_34a50a(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("myGifti.transfer.title")} />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">
          {v_8d41d7("myGifti.transfer.searchLabel")}
        </Text>
        <View className="flex-row items-center bg-secondary rounded-lg px-3">
          <Search size={16} color="#999" />
          <Input
            className="flex-1 border-0 bg-transparent"
            placeholder={v_8d41d7("myGifti.transfer.searchPlaceholder")}
            value={v_7c5791}
            onChangeText={v_6913b3}
            autoCapitalize="none"
          />
        </View>
        <Text className="text-xs text-muted-foreground mt-1.5">
          {v_8d41d7("myGifti.transfer.searchHint")}
        </Text>

        {}
        {v_4568f9 && (
          <View className="items-center py-4">
            <ActivityIndicator size="small" color="#CE3630" />
          </View>
        )}

        {!v_4568f9 && v_a7f568.length > 0 && (
          <View className="mt-2 border border-border rounded-xl overflow-hidden">
            <FlatList
              data={v_a7f568}
              keyExtractor={(v_8c0b26) => v_8c0b26.id}
              scrollEnabled={false}
              renderItem={({ item: v_8c0b26 }) => (
                <Pressable
                  className="flex-row items-center p-3 border-b border-border"
                  onPress={() => v_6121dc(v_8c0b26)}
                >
                  {v_8c0b26.telegram_photo ? (
                    <Image
                      source={{ uri: v_8c0b26.telegram_photo }}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <View className="w-10 h-10 rounded-full bg-muted items-center justify-center">
                      <User size={18} color="#999" />
                    </View>
                  )}
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-medium text-foreground">{v_8c0b26.name}</Text>
                    <Text className="text-xs text-muted-foreground">{v_8c0b26.email_masked}</Text>
                    {v_8c0b26.telegram_username && (
                      <Text className="text-xs text-muted-foreground">@{v_8c0b26.telegram_username}</Text>
                    )}
                  </View>
                </Pressable>
              )}
            />
          </View>
        )}

        {!v_4568f9 && v_7c5791.length >= 2 && v_a7f568.length === 0 && !v_587413 && (
          <View className="items-center py-4">
            <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.transfer.noResults")}</Text>
          </View>
        )}

        {}
        {v_587413 && (
          <View className="mt-4 bg-primary/5 border border-primary/30 rounded-xl p-4 flex-row items-center">
            {v_587413.telegram_photo ? (
              <Image
                source={{ uri: v_587413.telegram_photo }}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <View className="w-12 h-12 rounded-full bg-muted items-center justify-center">
                <User size={20} color="#999" />
              </View>
            )}
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-foreground">{v_587413.name}</Text>
              <Text className="text-sm text-muted-foreground">{v_587413.email_masked}</Text>
            </View>
            <Pressable onPress={() => { v_2122dd(null); v_c57190(""); }}>
              <Text className="text-sm text-destructive">{v_8d41d7("myGifti.transfer.changeUser")}</Text>
            </Pressable>
          </View>
        )}

        <Text className="text-xs text-muted-foreground mt-4">{v_8d41d7("myGifti.transfer.footnote")}</Text>

        <Button onPress={v_eb5366} disabled={v_683210 || !v_587413} className="mt-6">
          {v_683210 ? v_8d41d7("myGifti.transfer.loading") : v_8d41d7("myGifti.transfer.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
