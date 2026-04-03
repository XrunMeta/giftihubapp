import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Gift, Loader2 } from "lucide-react";
import { authApi, systemApi } from "../lib/api";
import { setToken, setUser, isAuthenticated } from "../lib/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate("/oth-path");
    systemApi.getDevMode().then((r) => setDevMode(r.dev_mode)).catch(() => {});
  }, [navigate]);

  const handleSuccess = useCallback(
    (data: { token: string; user: { id: string; name: string; role: string } }) => {
      setToken(data.token);
      setUser({ id: data.user.id, name: data.user.name, role: data.user.role as "user" | "merchant" });
      navigate(data.user.role === "merchant" ? "/merchant" : "/oth-path");
    },
    [navigate],
  );

  const handleEmailLogin = async () => {
    if (!email || !password) { setError("이메일과 비밀번호를 입력해주세요"); return; }
    setLoading(true);
    setError("");
    try {
      const data = await authApi.login(email, password);
      handleSuccess(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = async (role: "user" | "merchant") => {
    setLoading(true);
    setError("");
    try {
      const creds = role === "user"
        ? { email: "email@example.com", password: "1234" }
        : { email: "oth-test@example.invalid", password: "1234" };
      const data = await authApi.login(creds.email, creds.password);
      handleSuccess(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "개발 로그인에 실패했습니다");
    } finally {
      setLoading(false);
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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
            />
          </div>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            로그인
          </Button>

          {devMode && (
            <>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500">개발 모드</span></div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-blue-400 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleDevLogin("user")}
                  disabled={loading}
                >
                  개발 사용자 로그인
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-400 text-green-600 hover:bg-green-50"
                  onClick={() => handleDevLogin("merchant")}
                  disabled={loading}
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
