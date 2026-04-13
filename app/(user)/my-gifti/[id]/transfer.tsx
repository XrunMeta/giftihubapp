import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { searchUsers, transferVoucher, type SearchUser } from "@/services/vouchers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Search, User } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

export default function TransferScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchUser[]>([]);
  const [selected, setSelected] = useState<SearchUser | null>(null);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchUsers(q);
        setResults(res.users);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    setSelected(null);
    doSearch(text);
  };

  const handleSelect = (user: SearchUser) => {
    setSelected(user);
    setQuery(user.name);
    setResults([]);
  };

  const handleTransfer = async () => {
    if (!selected) {
      alert(t("myGifti.transfer.alertEmptyTitle"), t("myGifti.transfer.selectUserFirst"));
      return;
    }
    alert(
      t("myGifti.transfer.confirmTitle"),
      t("myGifti.transfer.confirmBodyUser")
        .replace("{{name}}", selected.name)
        .replace("{{email}}", selected.email_masked),
      [
        { text: t("myGifti.transfer.cancel"), style: "cancel" },
        {
          text: t("myGifti.transfer.transfer"),
          onPress: async () => {
            setLoading(true);
            try {
              await transferVoucher(id!, selected.id);
              alert(t("myGifti.transfer.doneTitle"), t("myGifti.transfer.doneBody"), [
                { text: t("myGifti.transfer.ok"), onPress: () => router.replace("/(user)/oth-path") },
              ]);
            } catch (err: any) {
              alert(t("myGifti.transfer.failTitle"), err.body?.error || t("myGifti.transfer.failBody"));
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("myGifti.transfer.title")} />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">
          {t("myGifti.transfer.searchLabel")}
        </Text>
        <View className="flex-row items-center bg-secondary rounded-lg px-3">
          <Search size={16} color="#999" />
          <Input
            className="flex-1 border-0 bg-transparent"
            placeholder={t("myGifti.transfer.searchPlaceholder")}
            value={query}
            onChangeText={handleQueryChange}
            autoCapitalize="none"
          />
        </View>
        <Text className="text-xs text-muted-foreground mt-1.5">
          {t("myGifti.transfer.searchHint")}
        </Text>

        {}
        {searching && (
          <View className="items-center py-4">
            <ActivityIndicator size="small" color="#CE3630" />
          </View>
        )}

        {!searching && results.length > 0 && (
          <View className="mt-2 border border-border rounded-xl overflow-hidden">
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row items-center p-3 border-b border-border"
                  onPress={() => handleSelect(item)}
                >
                  {item.telegram_photo ? (
                    <Image
                      source={{ uri: item.telegram_photo }}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <View className="w-10 h-10 rounded-full bg-muted items-center justify-center">
                      <User size={18} color="#999" />
                    </View>
                  )}
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-medium text-foreground">{item.name}</Text>
                    <Text className="text-xs text-muted-foreground">{item.email_masked}</Text>
                    {item.telegram_username && (
                      <Text className="text-xs text-muted-foreground">@{item.telegram_username}</Text>
                    )}
                  </View>
                </Pressable>
              )}
            />
          </View>
        )}

        {!searching && query.length >= 2 && results.length === 0 && !selected && (
          <View className="items-center py-4">
            <Text className="text-sm text-muted-foreground">{t("myGifti.transfer.noResults")}</Text>
          </View>
        )}

        {}
        {selected && (
          <View className="mt-4 bg-primary/5 border border-primary/30 rounded-xl p-4 flex-row items-center">
            {selected.telegram_photo ? (
              <Image
                source={{ uri: selected.telegram_photo }}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <View className="w-12 h-12 rounded-full bg-muted items-center justify-center">
                <User size={20} color="#999" />
              </View>
            )}
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-foreground">{selected.name}</Text>
              <Text className="text-sm text-muted-foreground">{selected.email_masked}</Text>
            </View>
            <Pressable onPress={() => { setSelected(null); setQuery(""); }}>
              <Text className="text-sm text-destructive">{t("myGifti.transfer.changeUser")}</Text>
            </Pressable>
          </View>
        )}

        <Text className="text-xs text-muted-foreground mt-4">{t("myGifti.transfer.footnote")}</Text>

        <Button onPress={handleTransfer} disabled={loading || !selected} className="mt-6">
          {loading ? t("myGifti.transfer.loading") : t("myGifti.transfer.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
