import { useState } from "react";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { ShoppingBag, Tag, Calendar, User } from "lucide-react";
import { mockMarketplaceListings } from "../../data/mockData";

export function Marketplace() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const handlePurchase = (listingId: string) => {
    alert("중고 기프티 구매가 완료되었습니다!");
    setSelectedListing(null);
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">중고마켓</h1>
          <p className="text-gray-600 text-sm mt-1">할인된 가격으로 기프티를 구매하세요</p>
        </div>

        <div className="p-4 space-y-3">
          {mockMarketplaceListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{listing.giftiName}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>만기일: {new Date(listing.expiryDate).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                  <Badge className="bg-orange-600 text-white whitespace-nowrap">
                    <User className="w-3 h-3 mr-1" />
                    {listing.sellerName}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                     ${listing.originalPrice.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      ${listing.sellingPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(listing.expiryDate).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      구매하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>기프티 구매 확인</DialogTitle>
                      <DialogDescription>
                        아래 기프티를 구매하시겠습니까?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-3">
                        <p className="font-semibold text-lg">{listing.giftiName}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">판매자:</span>
                          <span>{listing.sellerName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">원가:</span>
                          <span className="line-through">${listing.originalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">할인율:</span>
                          <span className="font-semibold">{listing.discount}%</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-semibold">결제 금액:</span>
                          <span className="text-xl font-bold text-orange-600">
                            ${listing.sellingPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => handlePurchase(listing.id)}
                      >
                        구매 확인
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}