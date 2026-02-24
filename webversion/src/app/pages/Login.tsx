import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Gift } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (type: "user" | "merchant") => {

    localStorage.setItem("userType", type);
    localStorage.setItem("userName", email.split("@")[0]);
    navigate(type === "user" ? "/oth-path" : "/merchant");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          <div className="space-y-2 pt-4">
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => handleLogin("user")}
            >
              사용자로 로그인
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("merchant")}
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