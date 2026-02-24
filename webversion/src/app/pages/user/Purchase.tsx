import { v_5ab095 } from "bapkr";
import { v_a04f9c, v_be9b94 } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_3cd08e, v_8bef26 } from "../../components/ui/radio-group";
import { v_92fe6b } from "../../components/ui/label";
import { v_c71054, v_d84748, v_f235de, v_ff645f } from "nchqfqoebgwu";

export function v_a60d00() {
  const v_9b57fc = v_a04f9c();
  const v_a55f0b = v_be9b94();
  const v_f63e09 = v_a55f0b.state?.amount || 0;
  const [v_2891ab, v_e76757] = v_5ab095<string>("paypal");

  const v_b1cab1 = [
    { id: "paypal", name: "PayPal", icon: v_d84748, color: "blue" },
    { id: "smileypay", name: "SmileyPay", icon: v_f235de, color: "purple" },
    { id: "usdt", name: "USDT (Crypto)", icon: v_ff645f, color: "green" },
  ];

  const v_dfaad1 = () => {

    alert(`결제가 완료되었습니다!\n금액: $${v_f63e09.toLocaleString()}\n결제수단: ${v_b1cab1.find(v_35f85c => v_35f85c.id === v_2891ab)?.name}`);
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
          <h1 className="text-lg font-semibold">결제하기</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">결제 금액</p>
                <p className="text-4xl font-bold text-orange-600">
                  ${v_f63e09.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">결제 수단 선택</h3>
              <RadioGroup value={v_2891ab} onValueChange={v_e76757}>
                <div className="space-y-3">
                  {v_b1cab1.map((v_bfe9b9) => {
                    const v_6bce96 = v_bfe9b9.icon;
                    return (
                      <div
                        key={v_bfe9b9.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          v_2891ab === v_bfe9b9.id
                            ? `border-${v_bfe9b9.color}-600 bg-${v_bfe9b9.color}-50`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => v_e76757(v_bfe9b9.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={v_bfe9b9.id} id={v_bfe9b9.id} />
                          <Label
                            htmlFor={v_bfe9b9.id}
                            className="flex items-center flex-1 cursor-pointer"
                          >
                            <Icon className={`w-6 h-6 mr-3 text-${v_bfe9b9.color}-600`} />
                            <span className="font-medium">{v_bfe9b9.name}</span>
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">안내:</span> 결제는 안전하게 처리되며, 
                결제 완료 후 즉시 기프티로 충전됩니다.
              </p>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_dfaad1}
            className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
          >
            ${v_f63e09.toLocaleString()} 결제하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}