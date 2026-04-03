import { useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircle, Gift, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

interface PurchaseResult {
  payment_id: string;
  listing?: {
    brand?: string;
    name?: string;
    selling_price?: number;
  };
}

export function MarketplacePurchaseComplete() {
  const navigate = useNavigate();
  const [result, setResult] = useState<PurchaseResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("marketplacePurchaseResult");
    if (stored) {
      try { setResult(JSON.parse(stored)); } catch {}
      sessionStorage.removeItem("marketplacePurchaseResult");
      sessionStorage.removeItem("marketplacePurchaseData");
    }
  }, []);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto p-4">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">구매 완료!</h1>
          <p className="text-gray-500">기프티가 내 기프티에 추가되었습니다</p>
        </div>

        {result?.listing && (
          <Card className="mb-6">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">{result.listing.brand}</p>
              <h2 className="font-semibold text-lg">{result.listing.name}</h2>
              {result.listing.selling_price && (
                <p className="text-orange-600 font-bold text-xl mt-2">
                  ${result.listing.selling_price.toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={() => navigate("/oth-path")}
          >
            <Gift className="w-4 h-4 mr-2" />
            기프티 확인하기
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/oth-path")}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            중고마켓으로
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
