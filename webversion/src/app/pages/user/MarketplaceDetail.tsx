import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_1a1e9e, v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_6185b9 } from "../../components/ui/badge";
import { v_c71054, v_429ab0, v_1ddb60, v_e4f0c5, v_4013d8 } from "nchqfqoebgwu";
import { v_75ac97, type v_5e360c as v_32f7c1 } from "../../lib/api";
import { v_c55bb9 } from "../../lib/auth";

export function v_5e360c() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const [v_a8fb42, v_ce7034] = v_5ab095<v_32f7c1 | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_5e9bfe, v_3a7d09] = v_5ab095("");

  v_c4deb2(() => {
    if (!v_389afb) return;
    v_75ac97
      .getDetail(v_389afb)
      .then((v_9390e8) => v_ce7034(v_9390e8.listing))
      .catch((v_9e86fd) => v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "불러오기 실패"))
      .finally(() => v_34a50a(false));
  }, [v_389afb]);

  const v_dfaad1 = () => {
    if (!v_a8fb42) return;
    sessionStorage.setItem("marketplacePurchaseData", JSON.stringify(v_a8fb42));
    v_9b57fc(`/oth-path${v_a8fb42.id}/purchase`);
  };

  if (v_683210) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        </div>
      </UserLayout>
    );
  }

  if (v_5e9bfe || !v_a8fb42) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <div className="text-center py-12 text-red-500">{v_5e9bfe || "리스팅을 찾을 수 없습니다"}</div>
          <Button variant="outline" className="w-full" onClick={() => v_9b57fc("/oth-path")}>
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
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">상품 상세</h1>
        </div>

        {}
        {(v_a8fb42.image_url || v_a8fb42.thumb_url) && (
          <div className="w-full aspect-video bg-gray-100 overflow-hidden">
            <img
              src={v_a8fb42.image_url || v_a8fb42.thumb_url}
              alt={v_a8fb42.name}
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
                  <p className="text-sm text-gray-500">{v_a8fb42.brand}</p>
                  <h2 className="text-xl font-bold">{v_a8fb42.name}</h2>
                </div>
                {v_a8fb42.discount > 0 && (
                  <Badge className="bg-red-500 text-white">-{v_a8fb42.discount}%</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  만료일:{" "}
                  {v_a8fb42.expiry_date
                    ? new Date(v_a8fb42.expiry_date * 1000).toLocaleDateString("ko-KR")
                    : "-"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>판매자: {v_a8fb42.seller_name}</span>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">원가</span>
                <span className="text-sm text-gray-400 line-through">
                  ${v_a8fb42.original_price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">할인율</span>
                <span className="text-sm font-semibold text-red-500">{v_a8fb42.discount}%</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">결제 금액</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${v_a8fb42.selling_price.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {}
          <p className="text-xs text-gray-400 text-center">
            구매 완료 시 기프티 소유권이 이전되며 새로운 바코드가 발급됩니다.
          </p>

          {}
          {v_a8fb42.status === "active" && (
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
              onClick={v_dfaad1}
              disabled={!v_c55bb9()}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {v_c55bb9() ? "구매하기" : "로그인 후 구매 가능"}
            </Button>
          )}

          {v_a8fb42.status !== "active" && (
            <div className="text-center py-4 text-gray-500">이미 판매된 상품입니다</div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
