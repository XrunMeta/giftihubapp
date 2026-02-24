import { v_2e5340 } from "../../components/MerchantLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_6185b9 } from "../../components/ui/badge";
import { v_373248, v_ed7019, v_2b3568, v_40f7a7 } from "../../components/ui/tabs";
import { v_32e130, v_429ab0, v_1ddb60, v_aa3f8f } from "nchqfqoebgwu";
import { v_1aad82 } from "../../data/mockData";

export function v_9f3d85() {
  const v_227df7 = new Date().toISOString().split("T")[0];
  const v_cd1bef = v_1aad82.filter((v_8d41d7) =>
    v_8d41d7.date.startsWith(v_227df7)
  );
  const v_867bb4 = v_1aad82;

  const v_afac89 = (transactions: typeof v_1aad82) => (
    <div className="space-y-3">
      {v_020dac.length > 0 ? (
        v_020dac.map((v_ede440) => (
          <Card key={v_ede440.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold">{v_ede440.customerName}</span>
                </div>
                <Badge
                  className={
                    v_ede440.status === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }
                >
                  {v_ede440.status === "completed" ? "완료" : "대기"}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-3 h-3" />
                  <span>{v_ede440.giftiName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(v_ede440.date).toLocaleString("ko-KR")}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <span className="text-gray-600">결제 금액</span>
                <span className="text-xl font-bold text-orange-600">
                  ${v_ede440.amount.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">거래 내역이 없습니다</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold flex items-center">
            <FileText className="w-6 h-6 mr-2 text-gray-700" />
            거래 내역
          </h1>
          <p className="text-gray-600 text-sm mt-1">기프티 사용 처리 내역</p>
        </div>

        {}
        <div className="p-4 pb-2">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">오늘 총 매출</p>
                <p className="text-lg font-bold">
                  ${v_cd1bef
                    .reduce((v_dce0a8, v_8d41d7) => v_dce0a8 + v_8d41d7.amount, 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">오늘 처리 건수</p>
                <p className="text-lg font-bold">{v_cd1bef.length}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-4 pb-4">
          {}
          <Tabs defaultValue="today">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="today">오늘</TabsTrigger>
              <TabsTrigger value="all">전체</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              {v_afac89(v_cd1bef)}
            </TabsContent>

            <TabsContent value="all">
              {v_afac89(v_867bb4)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MerchantLayout>
  );
}