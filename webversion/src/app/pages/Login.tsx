import { v_5ab095, v_c4deb2, v_de06a3 } from "bapkr";
import { v_a04f9c, v_80cb8d } from "wtmgqhsnsiyp";
import { v_1a40c4 } from "../components/ui/button";
import { v_1b353f } from "../components/ui/input";
import { v_92fe6b } from "../components/ui/label";
import { v_2dc782, v_e7d43c, v_5a8798, v_6a2c3c, v_5f0914 } from "../components/ui/card";
import { v_84fd28, v_4013d8 } from "nchqfqoebgwu";
import { v_3abe27, v_aef059 } from "../lib/api";
import { v_49c54d, v_99d813, v_c55bb9 } from "../lib/auth";

export function v_b11d5d() {
  const v_9b57fc = v_a04f9c();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_5e9bfe, v_3a7d09] = v_5ab095("");
  const [v_36b75f, v_f99445] = v_5ab095(false);

  v_c4deb2(() => {
    if (v_c55bb9()) v_9b57fc("/oth-path");
    v_aef059.getDevMode().then((v_cb35cb) => v_f99445(v_cb35cb.dev_mode)).catch(() => {});
  }, [v_9b57fc]);

  const v_9a36dd = v_de06a3(
    (v_9390e8) => {
      v_49c54d(v_9390e8.token);
      v_99d813({ id: v_9390e8.user.id, name: v_9390e8.user.name, role: v_9390e8.user.role as "user" | "merchant" });
      v_9b57fc(v_9390e8.user.role === "merchant" ? "/merchant" : "/oth-path");
    },
    [v_9b57fc],
  );

  const v_c02a62 = async () => {
    if (!v_e0c7e8 || !v_adc076) { v_3a7d09("이메일과 비밀번호를 입력해주세요"); return; }
    v_34a50a(true);
    v_3a7d09("");
    try {
      const v_9390e8 = await v_3abe27.login(v_e0c7e8, v_adc076);
      v_9a36dd(v_9390e8);
    } catch (v_9e86fd) {
      v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "로그인에 실패했습니다");
    } finally {
      v_34a50a(false);
    }
  };

  const v_81862e = async (v_22da99) => {
    v_34a50a(true);
    v_3a7d09("");
    try {
      const v_233911 = v_22da99 === "user"
        ? { email: "email@example.com", password: "1234" }
        : { email: "oth-test@example.invalid", password: "1234" };
      const v_9390e8 = await v_3abe27.login(v_233911.email, v_233911.password);
      v_9a36dd(v_9390e8);
    } catch (v_9e86fd) {
      v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "개발 로그인에 실패했습니다");
    } finally {
      v_34a50a(false);
    }
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
          <CardTitle className="text-2xl">GiftiHub</CardTitle>
          <CardDescription>디지털 기프티 플랫폼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {v_5e9bfe && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {v_5e9bfe}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={v_e0c7e8}
              onChange={(v_9e86fd) => v_fedf34(v_9e86fd.target.value)}
              onKeyDown={(v_9e86fd) => v_9e86fd.key === "Enter" && v_c02a62()}
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
              onKeyDown={(v_9e86fd) => v_9e86fd.key === "Enter" && v_c02a62()}
            />
          </div>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={v_c02a62}
            disabled={v_683210}
          >
            {v_683210 && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            로그인
          </Button>

          {v_36b75f && (
            <>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500">개발 모드</span></div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-blue-400 text-blue-600 hover:bg-blue-50"
                  onClick={() => v_81862e("user")}
                  disabled={v_683210}
                >
                  개발 사용자 로그인
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-400 text-green-600 hover:bg-green-50"
                  onClick={() => v_81862e("merchant")}
                  disabled={v_683210}
                >
                  개발 가맹점 로그인
                </Button>
              </div>
            </>
          )}

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
