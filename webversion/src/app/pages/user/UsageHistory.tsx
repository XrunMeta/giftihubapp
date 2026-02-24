import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1c7574, v_51bb20, v_429ab0 } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

export function v_f5bc2f() {

  const v_894039 = v_32addd
    .flatMap((v_898e2e) =>
      v_898e2e.usageHistory.map((v_cbbd71) => ({
        ...v_cbbd71,
        giftiName: v_898e2e.name,
      }))
    )
    .sort((v_779914, v_148ff6) => new Date(v_148ff6.date).getTime() - new Date(v_779914.date).getTime());

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold flex items-center">
            <History className="w-6 h-6 mr-2 text-gray-700" />
            사용 내역
          </h1>
          <p className="text-gray-600 text-sm mt-1">기프티 사용 기록</p>
        </div>

        <div className="p-4 space-y-3">
          {v_894039.length > 0 ? (
            v_894039.map((v_cbbd71) => (
              <Card key={v_cbbd71.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Store className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{v_cbbd71.merchantName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{v_cbbd71.giftiName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(v_cbbd71.date).toLocaleString("ko-KR")}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        -${v_cbbd71.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        잔액: ${v_cbbd71.remainingBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <History className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">사용 내역이 없습니다</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
}