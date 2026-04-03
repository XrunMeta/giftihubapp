import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { marketplaceApi, type MarketplaceListing } from "../../lib/api";
import { toast } from "sonner";

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  active: { label: "판매중", className: "bg-orange-500 text-white" },
  sold: { label: "판매완료", className: "bg-green-500 text-white" },
  cancelled: { label: "취소됨", className: "bg-gray-400 text-white" },
};

export function MarketplaceHistory() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("sell");
  const [myListings, setMyListings] = useState<(MarketplaceListing & { status?: string })[]>([]);
  const [myPurchases, setMyPurchases] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listingsRes, purchasesRes] = await Promise.all([
        marketplaceApi.getMyListings(),
        marketplaceApi.getMyPurchases(),
      ]);
      setMyListings(listingsRes.listings);
      setMyPurchases(purchasesRes.purchases);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCancel = async (id: string) => {
    try {
      await marketplaceApi.cancelListing(id);
      toast.success("판매가 취소되었습니다");
      fetchData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "취소에 실패했습니다");
    }
  };

  const ListingCard = ({ item, showCancel }: { item: MarketplaceListing & { status?: string }; showCancel?: boolean }) => {
    const status = STATUS_BADGE[(item as any).status] ?? STATUS_BADGE.active;
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500">{item.brand}</p>
              <h3 className="font-semibold text-sm">{item.name}</h3>
            </div>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 line-through">${item.original_price.toLocaleString()}</p>
              <p className="text-lg font-bold text-orange-600">${item.selling_price.toLocaleString()}</p>
            </div>
            {showCancel && (item as any).status === "active" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">
                    취소
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>판매 취소</DialogTitle>
                    <DialogDescription>
                      "{item.name}" 판매를 취소하시겠습니까? 기프티가 다시 사용 가능해집니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 justify-end pt-4">
                    <Button variant="outline">돌아가기</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleCancel(item.id)}>
                      취소 확인
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">내 거래내역</h1>
        </div>

        <div className="p-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sell">판매</TabsTrigger>
              <TabsTrigger value="buy">구매</TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
              </div>
            ) : (
              <>
                <TabsContent value="sell" className="space-y-3 mt-4">
                  {myListings.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">판매 내역이 없습니다</div>
                  ) : (
                    myListings.map((item) => (
                      <ListingCard key={item.id} item={item} showCancel />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="buy" className="space-y-3 mt-4">
                  {myPurchases.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">구매 내역이 없습니다</div>
                  ) : (
                    myPurchases.map((item) => (
                      <ListingCard key={item.id} item={item} />
                    ))
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </UserLayout>
  );
}
