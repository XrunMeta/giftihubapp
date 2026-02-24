import { v_1a1e9e, v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_c71054 } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

export function v_178dee() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const v_898e2e = v_32addd.find((v_206b88) => v_206b88.id === v_389afb);

  if (!v_898e2e) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>기프티를 찾을 수 없습니다</p>
          <Button
            onClick={() => v_9b57fc(-1)}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
          >
            이전으로
          </Button>
        </div>
      </UserLayout>
    );
  }

  const v_484203 = 1385;
  const v_715f13 = Math.round(v_898e2e.balance * v_484203);

  const v_2891ab = "PayPal";

  const v_39839d = () => {

    alert("환불 요청이 접수되었습니다.\n관리자 승인 후 처리됩니다.");
    v_9b57fc("/oth-path");
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">환불 요청</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              환불할 기프티
            </h2>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{v_898e2e.name}</h3>
                <div className="space-y-1">
                  <div>
                    <span className="font-semibold text-orange-600">
                      ${v_898e2e.balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    ₩{v_715f13.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              환불 정보
            </h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">환불 대상</span>
                  <span className="font-semibold text-lg">
                    ${v_898e2e.balance.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">원결제 수단</span>
                  <span className="font-semibold">{v_2891ab}</span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">환불 예상</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${v_898e2e.balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    원결제 수단으로 환불
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-2">
              <div className="text-sm text-gray-600 flex items-start">
                <span className="text-orange-600 mr-2">※</span>
                <span>원결제 수단으로 환불됩니다</span>
              </div>
              <div className="text-sm text-gray-600 flex items-start">
                <span className="text-orange-600 mr-2">※</span>
                <span>관리자 승인 후 처리됩니다 (영업일 기준 3~5일 소요)</span>
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_39839d}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          >
            환불 요청하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
