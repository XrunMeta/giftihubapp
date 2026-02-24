import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { History, Store, Calendar } from "lucide-react";
import { mockGiftis } from "../../data/mockData";

export function UsageHistory() {

  const allUsageRecords = mockGiftis
    .flatMap((gifti) =>
      gifti.usageHistory.map((record) => ({
        ...record,
        giftiName: gifti.name,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
          {allUsageRecords.length > 0 ? (
            allUsageRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Store className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{record.merchantName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{record.giftiName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.date).toLocaleString("ko-KR")}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        -${record.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        잔액: ${record.remainingBalance.toLocaleString()}
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