import { v_5ab095 } from "bapkr";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_6185b9 } from "../../components/ui/badge";
import { v_c2fdd1, v_1efbac, v_0c1bc0, v_bdaafa, v_8c709b, v_d49c66 } from "../../components/ui/dialog";
import { v_e4f0c5, v_7dc841, v_429ab0, v_1ddb60 } from "nchqfqoebgwu";
import { v_732099 } from "../../data/mockData";

export function v_11d8d2() {
  const [v_ebb1d9, v_5c219e] = v_5ab095<string | null>(null);

  const v_dfaad1 = (v_4b65e3) => {
    alert("중고 기프티 구매가 완료되었습니다!");
    v_5c219e(null);
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
          {v_732099.map((v_a8fb42) => (
            <Card key={v_a8fb42.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{v_a8fb42.giftiName}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>만기일: {new Date(v_a8fb42.expiryDate).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                  <Badge className="bg-orange-600 text-white whitespace-nowrap">
                    <User className="w-3 h-3 mr-1" />
                    {v_a8fb42.sellerName}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                     ${v_a8fb42.originalPrice.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      ${v_a8fb42.sellingPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(v_a8fb42.expiryDate).toLocaleDateString("ko-KR")}</span>
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
                        <p className="font-semibold text-lg">{v_a8fb42.giftiName}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">판매자:</span>
                          <span>{v_a8fb42.sellerName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">원가:</span>
                          <span className="line-through">${v_a8fb42.originalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">할인율:</span>
                          <span className="font-semibold">{v_a8fb42.discount}%</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-semibold">결제 금액:</span>
                          <span className="text-xl font-bold text-orange-600">
                            ${v_a8fb42.sellingPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => v_dfaad1(v_a8fb42.id)}
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