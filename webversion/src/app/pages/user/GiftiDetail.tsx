import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_1a1e9e, v_a04f9c, v_80cb8d } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_c71054, v_2d13e9, v_8d40c5, v_aa3f8f, v_e4f0c5 } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

export function v_5b2b38() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const v_898e2e = v_32addd.find((v_206b88) => v_206b88.id === v_389afb);
  const [v_0103dc, v_1b4b83] = v_5ab095(0);

  v_c4deb2(() => {

    const v_ad1d65 = setInterval(() => {
      v_1b4b83((v_ba2215) => v_ba2215 + 1);
    }, 30000);
    return () => clearInterval(v_ad1d65);
  }, []);

  if (!v_898e2e) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>기프티를 찾을 수 없습니다</p>
        </div>
      </UserLayout>
    );
  }

  const v_0fe9a6 = () => {
    v_1b4b83((v_ba2215) => v_ba2215 + 1);
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">기프티 상세</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">{v_898e2e.name}</h2>

                {}
                <div className="bg-white border-4 border-gray-200 rounded-xl p-6 my-6 relative">
                  <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }, (v_37eab7, v_ebec57) => (
                        <div
                          key={`${v_ebec57}-${v_0103dc}`}
                          className="w-2 h-2 bg-black rounded-sm"
                          style={{
                            opacity: Math.random() > 0.3 ? 1 : 0,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    QR코드는 보안을 위해 30초마다 갱신됩니다
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={v_0fe9a6}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    수동 갱신
                  </Button>
                </div>

                {}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">현재 잔액</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ${v_898e2e.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    / ${v_898e2e.originalAmount.toLocaleString()}
                  </p>
                </div>

                {}
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-4">
                  <div
                    className="bg-orange-600 h-full transition-all"
                    style={{
                      width: `${(v_898e2e.balance / v_898e2e.originalAmount) * 100}%`,
                    }}
                  />
                </div>

                {}
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">만료일</span>
                    <span className="font-semibold">
                      {new Date(v_898e2e.expiryDate).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">구매일</span>
                    <span className="font-semibold">
                      {new Date(v_898e2e.purchaseDate).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">양도</span>
                    <span className="font-semibold">
                      {v_898e2e.transferCount}/3회 사용
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상태</span>
                    <span className={`font-semibold ${
                      v_898e2e.status === "active" ? "text-green-600" :
                      v_898e2e.status === "used" ? "text-gray-500" :
                      "text-red-600"
                    }`}>
                      {v_898e2e.status === "active" ? "사용 가능" :
                       v_898e2e.status === "used" ? "사용 완료" :
                       "만료"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">기프티 코드</span>
                    <span className="font-mono text-xs">{v_898e2e.qrCode}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          {v_898e2e.status === "active" && (
            <div className="grid grid-cols-3 gap-3">
              <Link to={`/oth-path${v_898e2e.id}/transfer`} className="w-full">
                <Button variant="outline" className="w-full flex-col h-auto py-3">
                  <Send className="w-5 h-5 mb-1" />
                  <span className="text-sm">양도</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3"
                onClick={() => v_9b57fc(`/oth-path${v_898e2e.id}/refund`)}
              >
                <DollarSign className="w-5 h-5 mb-1" />
                <span className="text-sm">환불</span>
              </Button>
              <Link to="/oth-path" className="w-full">
                <Button variant="outline" className="w-full flex-col h-auto py-3">
                  <ShoppingBag className="w-5 h-5 mb-1" />
                  <span className="text-sm">판매등록</span>
                </Button>
              </Link>
            </div>
          )}

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">사용 내역</h3>
              {v_898e2e.usageHistory.length > 0 ? (
                <div className="space-y-3">
                  {v_898e2e.usageHistory.map((v_cbbd71) => (
                    <div key={v_cbbd71.id} className="border-l-2 border-orange-600 pl-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{v_cbbd71.merchantName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(v_cbbd71.date).toLocaleString("ko-KR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">
                            -${v_cbbd71.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            잔액: ${v_cbbd71.remainingBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  사용 내역이 없습니다
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
}