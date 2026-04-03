import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_24c64e, v_84fd28, v_e4f0c5 } from "nchqfqoebgwu";
import { v_c4deb2, v_5ab095 } from "bapkr";

interface PurchaseResult {
  payment_id: string;
  listing?: {
    brand?: string;
    name?: string;
    selling_price?: number;
  };
}

export function v_a1216b() {
  const v_9b57fc = v_a04f9c();
  const [v_43c42e, v_47323f] = v_5ab095<PurchaseResult | null>(null);

  v_c4deb2(() => {
    const v_5885b8 = sessionStorage.getItem("marketplacePurchaseResult");
    if (v_5885b8) {
      try { v_47323f(JSON.parse(v_5885b8)); } catch {}
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

        {v_43c42e?.listing && (
          <Card className="mb-6">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">{v_43c42e.listing.brand}</p>
              <h2 className="font-semibold text-lg">{v_43c42e.listing.name}</h2>
              {v_43c42e.listing.selling_price && (
                <p className="text-orange-600 font-bold text-xl mt-2">
                  ${v_43c42e.listing.selling_price.toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={() => v_9b57fc("/oth-path")}
          >
            <Gift className="w-4 h-4 mr-2" />
            기프티 확인하기
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => v_9b57fc("/oth-path")}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            중고마켓으로
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
