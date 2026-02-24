import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, RefreshCw, Send, DollarSign, ShoppingBag } from "lucide-react";
import { mockGiftis } from "../../data/mockData";

export function GiftiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gifti = mockGiftis.find((g) => g.id === id);
  const [qrRefreshKey, setQrRefreshKey] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setQrRefreshKey((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!gifti) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>기프티를 찾을 수 없습니다</p>
        </div>
      </UserLayout>
    );
  }

  const handleRefreshQR = () => {
    setQrRefreshKey((prev) => prev + 1);
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">기프티 상세</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">{gifti.name}</h2>

                {}
                <div className="bg-white border-4 border-gray-200 rounded-xl p-6 my-6 relative">
                  <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={`${i}-${qrRefreshKey}`}
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
                    onClick={handleRefreshQR}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    수동 갱신
                  </Button>
                </div>

                {}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">현재 잔액</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ${gifti.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    / ${gifti.originalAmount.toLocaleString()}
                  </p>
                </div>

                {}
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-4">
                  <div
                    className="bg-orange-600 h-full transition-all"
                    style={{
                      width: `${(gifti.balance / gifti.originalAmount) * 100}%`,
                    }}
                  />
                </div>

                {}
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">만료일</span>
                    <span className="font-semibold">
                      {new Date(gifti.expiryDate).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">구매일</span>
                    <span className="font-semibold">
                      {new Date(gifti.purchaseDate).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">양도</span>
                    <span className="font-semibold">
                      {gifti.transferCount}/3회 사용
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상태</span>
                    <span className={`font-semibold ${
                      gifti.status === "active" ? "text-green-600" :
                      gifti.status === "used" ? "text-gray-500" :
                      "text-red-600"
                    }`}>
                      {gifti.status === "active" ? "사용 가능" :
                       gifti.status === "used" ? "사용 완료" :
                       "만료"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">기프티 코드</span>
                    <span className="font-mono text-xs">{gifti.qrCode}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          {gifti.status === "active" && (
            <div className="grid grid-cols-3 gap-3">
              <Link to={`/oth-path${gifti.id}/transfer`} className="w-full">
                <Button variant="outline" className="w-full flex-col h-auto py-3">
                  <Send className="w-5 h-5 mb-1" />
                  <span className="text-sm">양도</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3"
                onClick={() => navigate(`/oth-path${gifti.id}/refund`)}
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
              {gifti.usageHistory.length > 0 ? (
                <div className="space-y-3">
                  {gifti.usageHistory.map((record) => (
                    <div key={record.id} className="border-l-2 border-orange-600 pl-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{record.merchantName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(record.date).toLocaleString("ko-KR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">
                            -${record.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            잔액: ${record.remainingBalance.toLocaleString()}
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