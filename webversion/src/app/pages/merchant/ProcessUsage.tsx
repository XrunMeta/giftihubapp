import { v_5ab095 } from "bapkr";
import { v_be9b94, v_a04f9c } from "wtmgqhsnsiyp";
import { v_2e5340 } from "../../components/MerchantLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_24c64e, v_1ddb60, v_f235de, v_c71054 } from "nchqfqoebgwu";

export function v_89dc4e() {
  const v_a55f0b = v_be9b94();
  const v_9b57fc = v_a04f9c();
  const v_41a839 = v_a55f0b.state || {
    giftiName: "기프티콘",
    balance: 0,
    customerName: "고객",
  };

  const [v_f63e09, v_1cbe59] = v_5ab095("");

  const v_17ebaf = (v_0ad8c5) => {
    if (v_0ad8c5 === "clear") {
      v_1cbe59("");
    } else if (v_0ad8c5 === "backspace") {
      v_1cbe59((v_ba2215) => v_ba2215.slice(0, -1));
    } else {
      const v_561581 = v_f63e09 + v_0ad8c5;
      if (parseInt(v_561581) <= v_41a839.balance) {
        v_1cbe59(v_561581);
      }
    }
  };

  const v_89cc46 = () => {
    if (!v_f63e09 || parseInt(v_f63e09) === 0) {
      alert("사용 금액을 입력해주세요");
      return;
    }
    alert(`결제가 완료되었습니다!\n사용 금액: $${parseInt(v_f63e09).toLocaleString()}`);
    v_9b57fc("/merchant");
  };

  const v_64a723 = () => {
    v_1cbe59(v_41a839.balance.toString());
  };

  const v_d965ec = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["clear", "0", "backspace"],
  ];

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">사용 처리</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">고객명</span>
                  </div>
                  <span className="font-semibold">{v_41a839.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm">기프티</span>
                  </div>
                  <span className="font-semibold">{v_41a839.giftiName}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-gray-600 text-sm">잔액</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${v_41a839.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">사용 금액</p>
                <div className="text-4xl font-bold text-orange-600 mb-4 min-h-[3rem] flex items-center justify-center">
                  ${v_f63e09 ? parseInt(v_f63e09).toLocaleString() : "0"}
                </div>
                <Button
                  onClick={v_64a723}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  전액 사용
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {v_d965ec.map((v_3ac7e7, v_554071) =>
                  v_3ac7e7.map((v_b24339, v_84650a) => (
                    <Button
                      key={`${v_554071}-${v_84650a}`}
                      onClick={() => v_17ebaf(v_b24339)}
                      variant="outline"
                      className="h-16 text-xl font-semibold"
                    >
                      {v_b24339 === "clear" ? "C" : v_b24339 === "backspace" ? "⌫" : v_b24339}
                    </Button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_89cc46}
            className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
            disabled={!v_f63e09 || parseInt(v_f63e09) === 0}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            사용 처리 완료
          </Button>
        </div>
      </div>
    </MerchantLayout>
  );
}