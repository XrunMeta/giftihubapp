import { Link, useLocation } from "react-router";
import { Package, Users, ArrowLeftRight, Calculator, Settings } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const tabs = [
    { path: "/oth-path", icon: Package, label: "상품" },
    { path: "/oth-path", icon: Users, label: "회원" },
    { path: "/oth-path", icon: ArrowLeftRight, label: "거래" },
    { path: "/oth-path", icon: Calculator, label: "정산" },
    { path: "/oth-path", icon: Settings, label: "시스템" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {children}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center py-3 px-4 flex-1 ${
                  isActive ? "text-orange-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
