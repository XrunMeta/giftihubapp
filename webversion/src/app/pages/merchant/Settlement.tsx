import { useState } from "react";
import { MerchantLayout } from "../../components/MerchantLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { DollarSign, Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { mockSettlements } from "../../data/mockData";

export function Settlement() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            완료
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" />
            처리중
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            대기
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleRecordPayment = (settlementId: string) => {
    alert("정산 실결제가 기록되었습니다");
    setPaymentAmount("");
    setPaymentDate("");
  };

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-gray-700" />
            정산 관리
          </h1>
          <p className="text-gray-600 text-sm mt-1">월별 정산 현황 및 실결제 내역</p>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-300">이번 달 예상 정산액</span>
              </div>
              <p className="text-3xl font-bold">
                ${mockSettlements
                  .filter((s) => s.status !== "completed")
                  .reduce((sum, s) => sum + s.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {mockSettlements[0].transactionCount}건 거래
              </p>
            </CardContent>
          </Card>

          {}
          <div className="space-y-3">
            <h3 className="font-semibold">정산 내역</h3>

            {mockSettlements.map((settlement) => (
              <Card key={settlement.month}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold">{settlement.month}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {settlement.transactionCount}건 거래
                      </p>
                    </div>
                    {getStatusBadge(settlement.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">정산 금액</span>
                      <span className="text-xl font-bold text-orange-600">
                        ${settlement.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {settlement.status === "completed" && (
                      <>
                        <div className="flex justify-between items-center text-sm pt-2 border-t">
                          <span className="text-gray-600">실결제 금액</span>
                          <span className="font-semibold text-green-600">
                            ${settlement.paidAmount?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">결제 일자</span>
                          <span className="text-gray-700">{settlement.paymentDate}</span>
                        </div>
                      </>
                    )}

                    {settlement.status === "pending" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            size="sm"
                          >
                            실결제 기록하기
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>실결제 기록</DialogTitle>
                            <DialogDescription>
                              실제 입금받은 정산 금액과 날짜를 기록하세요
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount">실결제 금액 (USD)</Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="0"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="date">결제 일자</Label>
                              <Input
                                id="date"
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                              />
                            </div>
                            <Button
                              onClick={() => handleRecordPayment(settlement.month)}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                              기록하기
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-blue-900">정산 안내</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 정산은 매월 10일에 진행됩니다</li>
                <li>• 실결제 내역은 수동으로 기록해주세요</li>
                <li>• 정산 내역은 세금 신고 시 활용 가능합니다</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MerchantLayout>
  );
}