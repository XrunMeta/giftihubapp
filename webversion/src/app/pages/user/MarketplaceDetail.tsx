import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Calendar, User, ShoppingBag, Loader2 } from "lucide-react";
import { marketplaceApi, type MarketplaceDetail as MarketplaceDetailType } from "../../lib/api";
import { isAuthenticated } from "../../lib/auth";

export function MarketplaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<MarketplaceDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    marketplaceApi
      .getDetail(id)
      .then((data) => setListing(data.listing))
      .catch((e) => setError(e instanceof Error ? e.message : "불러오기 실패"))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePurchase = () => {
    if (!listing) return;
    sessionStorage.setItem("marketplacePurchaseData", JSON.stringify(listing));
    navigate(`/oth-path${listing.id}/purchase`);
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        </div>
      </UserLayout>
    );
  }

  if (error || !listing) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <div className="text-center py-12 text-red-500">{error || "리스팅을 찾을 수 없습니다"}</div>
          <Button variant="outline" className="w-full" onClick={() => navigate("/oth-path")}>
            목록으로 돌아가기
          </Button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">상품 상세</h1>
        </div>

        {}
        {(listing.image_url || listing.thumb_url) && (
          <div className="w-full aspect-video bg-gray-100 overflow-hidden">
            <img
              src={listing.image_url || listing.thumb_url}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{listing.brand}</p>
                  <h2 className="text-xl font-bold">{listing.name}</h2>
                </div>
                {listing.discount > 0 && (
                  <Badge className="bg-red-500 text-white">-{listing.discount}%</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  만료일:{" "}
                  {listing.expiry_date
                    ? new Date(listing.expiry_date * 1000).toLocaleDateString("ko-KR")
                    : "-"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>판매자: {listing.seller_name}</span>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">원가</span>
                <span className="text-sm text-gray-400 line-through">
                  ${listing.original_price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">할인율</span>
                <span className="text-sm font-semibold text-red-500">{listing.discount}%</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">결제 금액</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${listing.selling_price.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {}
          <p className="text-xs text-gray-400 text-center">
            구매 완료 시 기프티 소유권이 이전되며 새로운 바코드가 발급됩니다.
          </p>

          {}
          {listing.status === "active" && (
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
              onClick={handlePurchase}
              disabled={!isAuthenticated()}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {isAuthenticated() ? "구매하기" : "로그인 후 구매 가능"}
            </Button>
          )}

          {listing.status !== "active" && (
            <div className="text-center py-4 text-gray-500">이미 판매된 상품입니다</div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
