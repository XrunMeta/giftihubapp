import { v_5ab095 } from "bapkr";
import { v_a04f9c, v_80cb8d } from "wtmgqhsnsiyp";
import { v_1a40c4 } from "../components/ui/button";
import { v_1b353f } from "../components/ui/input";
import { v_92fe6b } from "../components/ui/label";
import { v_2dc782, v_e7d43c, v_5a8798, v_6a2c3c, v_5f0914 } from "../components/ui/card";
import { v_84fd28 } from "nchqfqoebgwu";

export function v_b11d5d() {
  const v_9b57fc = v_a04f9c();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");

  const v_ec4736 = (v_3b27d9) => {

    localStorage.setItem("userType", v_3b27d9);
    localStorage.setItem("userName", v_e0c7e8.split("@")[0]);
    v_9b57fc(v_3b27d9 === "user" ? "/oth-path" : "/merchant");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-600 p-3 rounded-full">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">GiftiHub에 오신 것을 환영합니다</CardTitle>
          <CardDescription>디지털 기프티 플랫폼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={v_e0c7e8}
              onChange={(v_9e86fd) => v_fedf34(v_9e86fd.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={v_adc076}
              onChange={(v_9e86fd) => v_52b279(v_9e86fd.target.value)}
            />
          </div>

          <div className="space-y-2 pt-4">
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => v_ec4736("user")}
            >
              사용자로 로그인
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => v_ec4736("merchant")}
            >
              가맹점으로 로그인
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline font-medium">
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}