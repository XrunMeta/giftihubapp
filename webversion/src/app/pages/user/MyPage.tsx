import { useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Settings, Bell, HelpCircle, Shield, LogOut, ChevronRight } from "lucide-react";

export function MyPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "사용자";

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const menuItems = [
    { icon: Settings, label: "계정 설정", action: () => {} },
    { icon: Bell, label: "알림 설정", action: () => {} },
    { icon: Shield, label: "보안 설정", action: () => {} },
    { icon: HelpCircle, label: "고객 지원", action: () => {} },
  ];

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">마이페이지</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-orange-600 text-white text-xl">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{userName}</h2>
                  <p className="text-sm text-gray-600">일반 회원</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-0">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                      index !== menuItems.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>

          {}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>GiftiHub v1.0.0</p>
            <p className="mt-1">© 2026 GiftiHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}