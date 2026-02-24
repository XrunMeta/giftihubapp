import { v_5ab095 } from "bapkr";
import { v_2e5340 } from "../../components/MerchantLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_6185b9 } from "../../components/ui/badge";
import { v_c2fdd1, v_1efbac, v_0c1bc0, v_bdaafa, v_8c709b, v_d49c66 } from "../../components/ui/dialog";
import { v_1b353f } from "../../components/ui/input";
import { v_92fe6b } from "../../components/ui/label";
import { v_aa3f8f, v_429ab0, v_24c64e, v_20f6a6, v_e91344 } from "nchqfqoebgwu";
import { v_c64f11 } from "../../data/mockData";

export function v_4928ef() {
  const [v_ff92f6, v_d16494] = v_5ab095("");
  const [v_592311, v_a2ff15] = v_5ab095("");

  const v_395974 = (v_d308b5) => {
    switch (v_d308b5) {
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

  const v_a6bfde = (v_f8687a) => {
    alert("정산 실결제가 기록되었습니다");
    v_d16494("");
    v_a2ff15("");
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
                ${v_c64f11
                  .filter((v_fd5f43) => v_fd5f43.status !== "completed")
                  .reduce((v_dce0a8, v_fd5f43) => v_dce0a8 + v_fd5f43.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {v_c64f11[0].transactionCount}건 거래
              </p>
            </CardContent>
          </Card>

          {}
          <div className="space-y-3">
            <h3 className="font-semibold">정산 내역</h3>

            {v_c64f11.map((v_16c36f) => (
              <Card key={v_16c36f.month}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold">{v_16c36f.month}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {v_16c36f.transactionCount}건 거래
                      </p>
                    </div>
                    {v_395974(v_16c36f.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">정산 금액</span>
                      <span className="text-xl font-bold text-orange-600">
                        ${v_16c36f.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {v_16c36f.status === "completed" && (
                      <>
                        <div className="flex justify-between items-center text-sm pt-2 border-t">
                          <span className="text-gray-600">실결제 금액</span>
                          <span className="font-semibold text-green-600">
                            ${v_16c36f.paidAmount?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">결제 일자</span>
                          <span className="text-gray-700">{v_16c36f.paymentDate}</span>
                        </div>
                      </>
                    )}

                    {v_16c36f.status === "pending" && (
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
                                value={v_ff92f6}
                                onChange={(v_9e86fd) => v_d16494(v_9e86fd.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="date">결제 일자</Label>
                              <Input
                                id="date"
                                type="date"
                                value={v_592311}
                                onChange={(v_9e86fd) => v_a2ff15(v_9e86fd.target.value)}
                              />
                            </div>
                            <Button
                              onClick={() => v_a6bfde(v_16c36f.month)}
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