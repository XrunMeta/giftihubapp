import { v_80cb8d, v_be9b94 } from "wtmgqhsnsiyp";
import { v_ea0732, v_e4f0c5, v_6b9090, v_f235de, v_6e86e2 } from "nchqfqoebgwu";

export function v_348e5f({ children: v_21f619 }: { children: React.ReactNode }) {
  const v_a55f0b = v_be9b94();

  const v_c6c04c = [
    { path: "/oth-path", icon: v_ea0732, label: "홈" },
    { path: "/oth-path", icon: v_e4f0c5, label: "중고마켓" },
    { path: "/oth-path", icon: v_6b9090, label: "스토어" },
    { path: "/oth-path", icon: v_f235de, label: "내 기프티" },
    { path: "/oth-path", icon: v_6e86e2, label: "MY" },
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
                className={`flex flex-col items-center py-3 px-2 flex-1 ${
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