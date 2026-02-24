import { Link, useLocation } from "react-router";
import { Home, ShoppingBag, ShoppingCart, Wallet, UserCircle } from "lucide-react";

export function UserLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const tabs = [
    { path: "/oth-path", icon: Home, label: "홈" },
    { path: "/oth-path", icon: ShoppingBag, label: "중고마켓" },
    { path: "/oth-path", icon: ShoppingCart, label: "스토어" },
    { path: "/oth-path", icon: Wallet, label: "내 기프티" },
    { path: "/oth-path", icon: UserCircle, label: "MY" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {children}

      {}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center py-3 px-2 flex-1 ${
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