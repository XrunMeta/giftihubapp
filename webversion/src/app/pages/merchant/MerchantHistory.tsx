import { MerchantLayout } from "../../components/MerchantLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { FileText, Calendar, User, DollarSign } from "lucide-react";
import { mockMerchantTransactions } from "../../data/mockData";

export function MerchantHistory() {
  const today = new Date().toISOString().split("T")[0];
  const todayTransactions = mockMerchantTransactions.filter((t) =>
    t.date.startsWith(today)
  );
  const allTransactions = mockMerchantTransactions;

  const renderTransactionList = (transactions: typeof mockMerchantTransactions) => (
    <div className="space-y-3">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold">{transaction.customerName}</span>
                </div>
                <Badge
                  className={
                    transaction.status === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }
                >
                  {transaction.status === "completed" ? "완료" : "대기"}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-3 h-3" />
                  <span>{transaction.giftiName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(transaction.date).toLocaleString("ko-KR")}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <span className="text-gray-600">결제 금액</span>
                <span className="text-xl font-bold text-orange-600">
                  ${transaction.amount.toLocaleString()}
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
                  ${todayTransactions
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">오늘 처리 건수</p>
                <p className="text-lg font-bold">{todayTransactions.length}</p>
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
              {renderTransactionList(todayTransactions)}
            </TabsContent>

            <TabsContent value="all">
              {renderTransactionList(allTransactions)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MerchantLayout>
  );
}