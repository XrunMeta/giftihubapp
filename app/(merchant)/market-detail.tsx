import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Package } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { resolveImageUrl } from "@/lib/image";
import { getListingDetail, type MarketplaceListing } from "@/services/marketplace";
import { format } from "date-fns";

export default function MerchantMarketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<MarketplaceListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadListing();
  }, [id]);

  const loadListing = async () => {
    try {
      const res = await getListingDetail(id!);
      setListing(res.listing);
    } catch {
      Alert.alert("오류", "상품 정보를 불러올 수 없습니다.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !listing) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isSet = !!(listing as any).set_id;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="상품 상세" />
      <ScrollView className="flex-1 px-5">
        {(() => {
          const imgUri = resolveImageUrl(listing.image_url, listing.brand_logo);
          return imgUri ? (
            <Image source={{ uri: imgUri }} className="w-full h-48 rounded-xl mt-2" resizeMode="cover" />
          ) : (
            <View className="w-full h-36 rounded-xl mt-2 bg-muted items-center justify-center">
              {isSet ? <Package size={40} color="#CE3630" /> : <Text className="text-4xl">🎁</Text>}
            </View>
          );
        })()}
        <View className="bg-card rounded-xl border border-border p-5 mt-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-xs text-muted-foreground">{listing.brand}</Text>
                {isSet && (
                  <View className="bg-primary/10 rounded px-1.5 py-0.5">
                    <Text className="text-[10px] font-medium text-primary">구성상품</Text>
                  </View>
                )}
              </View>
              <Text className="text-xl font-bold text-foreground mt-1">{listing.name}</Text>
            </View>
            {listing.discount > 0 && (
              <Badge variant="destructive" label={`${listing.discount}% OFF`} />
            )}
          </View>

          <Separator className="my-4" />

          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">원가</Text>
              <Text className="text-sm text-muted-foreground line-through">
                ₩{listing.original_price.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-foreground">판매가</Text>
              <Text className="text-xl font-bold text-primary">
                ₩{listing.selling_price.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm text-foreground">
                {format(new Date(listing.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">판매자</Text>
              <Text className="text-sm text-foreground">{listing.seller_name}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 py-4 border-t border-border">
        <Button
          onPress={() =>
            router.push({
              pathname: "/(merchant)/market-purchase",
              params: { listingId: listing.id },
            })
          }
        >
          구매하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
