import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { formatPrice, currencySymbol } from "@/lib/currency";
import { resolveImageUrl } from "@/lib/image";
import { cancelListing, getListingDetail, type MarketplaceListing, type SetVoucher } from "@/services/marketplace";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function MarketplaceDetailScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [listing, setListing] = useState<MarketplaceListing | null>(null);
  const [setVouchers, setSetVouchers] = useState<SetVoucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const isOwner = !!(user && listing && listing.seller_id === user.id);

  const handleCancel = () => {
    if (!listing) return;
    alert(
      t("userMarketplace.detail.cancelConfirmTitle"),
      t("userMarketplace.detail.cancelConfirmBody"),
      [
        { text: t("userMarketplace.detail.cancelNo"), style: "cancel" },
        {
          text: t("userMarketplace.detail.cancelYes"),
          style: "destructive",
          onPress: async () => {
            setCancelling(true);
            try {
              await cancelListing(listing.id);
              alert(t("userMarketplace.detail.cancelDoneTitle"), t("userMarketplace.detail.cancelDoneBody"));
              router.back();
            } catch (err: any) {
              alert(t("userMarketplace.detail.cancelFailTitle"), String(err?.message ?? err));
            } finally {
              setCancelling(false);
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (id) loadListing();
  }, [id]);

  const loadListing = async () => {
    try {
      const res = await getListingDetail(id!);
      setListing(res.listing);
      setSetVouchers(res.set_vouchers ?? []);
    } catch {
      alert(t("userMarketplace.detail.loadErrorTitle"), t("userMarketplace.detail.loadErrorBody"));
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !listing) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader
        title={t("userMarketplace.detail.title")}
        onBackPress={() => router.navigate("/(user)/oth-path")}
      />
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 12 }}>
        {(() => {
          const imgUri = resolveImageUrl(listing.image_url, listing.brand_logo);
          return imgUri ? (
            <Image source={{ uri: imgUri }} className="w-full h-48 rounded-xl mt-2" resizeMode="contain" />
          ) : (
            <View className="w-full h-36 rounded-xl mt-2 bg-muted items-center justify-center">
              <Text className="text-4xl">🎁</Text>
            </View>
          );
        })()}
        <View className="bg-card rounded-xl border border-border p-5 mt-3">
          {listing.set_id && (
            <View className="flex-row items-center mb-3 gap-2 pb-3 border-b border-border">
              <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
                <Package size={18} color="#CE3630" />
              </View>
              <Text className="text-sm font-semibold text-primary flex-1">
                {t("myGifti.list.bundleTitle").replace("{{count}}", String(listing.set_count ?? ""))}
              </Text>
            </View>
          )}
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{listing.brand}</Text>
              <Text className="text-xl font-bold text-foreground mt-1">{listing.name}</Text>
            </View>
            {listing.discount > 0 && (
              <Badge variant="destructive" label={`${listing.discount}% OFF`} />
            )}
          </View>

          <Separator className="my-4" />

          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("userMarketplace.detail.originalPrice")}</Text>
              <Text className="text-sm text-muted-foreground line-through">
                {formatPrice(listing.original_price, listing.currency)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-foreground">{t("userMarketplace.detail.salePrice")}</Text>
              <Text className="text-xl font-bold text-primary">
                {formatPrice(listing.selling_price, listing.currency)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("userMarketplace.detail.expiry")}</Text>
              <Text className="text-sm text-foreground">
                {format(new Date(listing.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("userMarketplace.detail.seller")}</Text>
              <Text className="text-sm text-foreground">{listing.seller_name}</Text>
            </View>
          </View>
        </View>

        {setVouchers.length > 0 && (
          <View className="bg-card rounded-xl border border-border p-4 mt-3">
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t("userMarketplace.detail.includedItems")}
            </Text>
            {setVouchers.map((v, i) => {
              const sym = currencySymbol(v.base_currency);
              const price = v.face_value_base || v.face_value;
              return (
                <View key={i} className="flex-row justify-between items-center py-1.5 border-b border-border last:border-b-0">
                  <View className="flex-1 mr-2">
                    <Text className="text-xs text-muted-foreground">{v.brand}</Text>
                    <Text className="text-sm text-foreground" numberOfLines={1}>{v.name}</Text>
                  </View>
                  <Text className="text-sm font-medium text-foreground">{sym}{price.toLocaleString()}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View className="px-5 py-3 border-t border-border bg-white">
        {isOwner ? (
          <Button variant="destructive" disabled={cancelling} onPress={handleCancel}>
            {cancelling ? t("userMarketplace.detail.cancelling") : t("userMarketplace.detail.cancelListing")}
          </Button>
        ) : (
          <Button
            onPress={() =>
              router.push({
                pathname: "/(user)/oth-path",
                params: { listingId: listing.id },
              })
            }
          >
            {t("userMarketplace.detail.purchase")}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
