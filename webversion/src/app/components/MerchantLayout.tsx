import { v_80cb8d, v_be9b94 } from "wtmgqhsnsiyp";
import { v_19ca5b, v_d84748, v_32e130, v_aa3f8f, v_5dcc4b } from "nchqfqoebgwu";

export function v_2e5340({ children: v_21f619 }: { children: React.ReactNode }) {
  const v_a55f0b = v_be9b94();

  const v_c6c04c = [
    { path: "/merchant", icon: v_19ca5b, label: "QR스캔" },
    { path: "/merchant/process", icon: v_d84748, label: "사용처리" },
    { path: "/merchant/history", icon: v_32e130, label: "내역" },
    { path: "/merchant/settlement", icon: v_aa3f8f, label: "정산" },
    { path: "/merchant/settings", icon: v_5dcc4b, label: "설정" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {v_21f619}

      {}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around">
          {v_c6c04c.map((v_11083e) => {
            const v_6bce96 = v_11083e.icon;
            const v_26dce6 = v_a55f0b.pathname === v_11083e.path;
            return (
              <Link
                key={v_11083e.path}
                to={v_11083e.path}
                className={`flex flex-col items-center py-3 px-4 flex-1 ${
                  v_26dce6 ? "text-orange-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{v_11083e.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}