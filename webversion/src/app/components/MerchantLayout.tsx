import { Link, useLocation } from "react-router";
import { QrCode, CreditCard, FileText, DollarSign, Settings } from "lucide-react";

export function MerchantLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const tabs = [
    { path: "/merchant", icon: QrCode, label: "QR스캔" },
    { path: "/merchant/process", icon: CreditCard, label: "사용처리" },
    { path: "/merchant/history", icon: FileText, label: "내역" },
    { path: "/merchant/settlement", icon: DollarSign, label: "정산" },
    { path: "/merchant/settings", icon: Settings, label: "설정" },
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