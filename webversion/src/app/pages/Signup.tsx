import { v_5ab095 } from "bapkr";
import { v_a04f9c, v_80cb8d } from "wtmgqhsnsiyp";
import { v_1a40c4 } from "../components/ui/button";
import { v_2dc782, v_e7d43c, v_5a8798, v_6a2c3c, v_5f0914 } from "../components/ui/card";
import { v_84fd28, v_1ddb60, v_51bb20 } from "nchqfqoebgwu";

export function v_6ab0ac() {
  const v_9b57fc = v_a04f9c();
  const [v_4aea76, v_9c0811] = v_5ab095<"user" | "merchant" | null>(null);

  const v_47ed2f = () => {
    if (v_4aea76) {
      localStorage.setItem("userType", v_4aea76);
      v_9b57fc(v_4aea76 === "user" ? "/oth-path" : "/merchant");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-600 p-3 rounded-full">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">GiftiHub 회원가입</CardTitle>
          <CardDescription>계정 타입을 선택해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => v_9c0811("user")}
              className={`p-6 border-2 rounded-lg transition-all ${
                v_4aea76 === "user"
                  ? "border-orange-600 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-4 rounded-full ${
                  v_4aea76 === "user" ? "bg-orange-600" : "bg-gray-100"
                }`}>
                  <User className={`w-8 h-8 ${
                    v_4aea76 === "user" ? "text-white" : "text-gray-600"
                  }`} />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">사용자</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    기프티 구매 및 사용
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => v_9c0811("merchant")}
              className={`p-6 border-2 rounded-lg transition-all ${
                v_4aea76 === "merchant"
                  ? "border-orange-600 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-4 rounded-full ${
                  v_4aea76 === "merchant" ? "bg-orange-600" : "bg-gray-100"
                }`}>
                  <Store className={`w-8 h-8 ${
                    v_4aea76 === "merchant" ? "text-white" : "text-gray-600"
                  }`} />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">가맹점</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    기프티 결제 수용
                  </p>
                </div>
              </div>
            </button>
          </div>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={v_47ed2f}
            disabled={!v_4aea76}
          >
            가입하기
          </Button>

          <div className="text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-orange-600 hover:underline font-medium">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}