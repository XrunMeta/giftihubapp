import { v_c4deb2, v_5ab095 } from "bapkr";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_1b353f } from "../../components/ui/input";
import { v_a07c02, v_1290fc, v_3cd8a3 } from "nchqfqoebgwu";

interface Keyword {
  id: number;
  name: string;
  display_order: number;
}

const v_cc9198 = import.meta.env.VITE_API_BASE ?? "https://oth-path-8f7f45.example.invalid/oth-path";

function v_499b6e() {
  return localStorage.getItem("token");
}

async function v_05a921<T>(v_9fe22d, v_b36f96 = {}): Promise<T> {
  const v_21cc31 = v_499b6e();
  const v_3f4675 = {
    "Content-Type": "application/json",
    ...(v_b36f96.headers as Record<string, string> ?? {}),
  };
  if (v_21cc31) v_3f4675["Authorization"] = `Bearer ${v_21cc31}`;
  const v_8f00b9 = await fetch(`${v_cc9198}${v_9fe22d}`, { ...v_b36f96, headers: v_3f4675 });
  const v_9390e8 = await v_8f00b9.json();
  if (!v_8f00b9.ok) throw new Error((v_9390e8 as { error?: string }).error ?? `API error ${v_8f00b9.status}`);
  return v_9390e8 as T;
}

export function v_196648() {
  const [v_7a80c2, v_0198e2] = v_5ab095<Keyword[]>([]);
  const [v_6ccf9e, v_a742c1] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(true);

  const v_f6f5de = async () => {
    try {
      const v_8f00b9 = await v_05a921<{ keywords: Keyword[] }>("/keywords");
      v_0198e2(v_8f00b9.keywords);
    } catch (v_9e86fd) {
      console.error(v_9e86fd);
    } finally {
      v_34a50a(false);
    }
  };

  v_c4deb2(() => { v_f6f5de(); }, []);

  const v_c1a04f = async () => {
    const v_1833e7 = v_6ccf9e.trim();
    if (!v_1833e7) return;
    try {
      const v_eb5f78 = v_7a80c2.reduce((v_d2c6bf, v_0eb677) => Math.max(v_d2c6bf, v_0eb677.display_order), 0);
      await v_05a921("/keywords", {
        method: "POST",
        body: JSON.stringify({ name: v_1833e7, display_order: v_eb5f78 + 1 }),
      });
      v_a742c1("");
      v_f6f5de();
    } catch (v_9e86fd) {
      alert(v_9e86fd.message);
    }
  };

  const v_c5dfdd = async (v_389afb, v_1833e7) => {
    if (!confirm(`"${v_1833e7}" 키워드를 삭제하시겠습니까?`)) return;
    try {
      await v_05a921(`/keywords/${v_389afb}`, { method: "DELETE" });
      v_f6f5de();
    } catch (v_9e86fd) {
      alert(v_9e86fd.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">키워드 관리</h1>
          <p className="text-sm text-gray-500 mt-1">마켓 필터에 사용되는 키워드를 관리합니다</p>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  value={v_6ccf9e}
                  onChange={(v_9e86fd) => v_a742c1(v_9e86fd.target.value)}
                  placeholder="새 키워드 이름"
                  onKeyDown={(v_9e86fd) => v_9e86fd.key === "Enter" && v_c1a04f()}
                />
                <Button onClick={v_c1a04f} className="shrink-0">
                  <Plus className="w-4 h-4 mr-1" />
                  추가
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">등록된 키워드 ({v_7a80c2.length})</h3>
              {v_683210 ? (
                <p className="text-gray-500 text-sm">로딩 중...</p>
              ) : v_7a80c2.length === 0 ? (
                <p className="text-gray-500 text-sm">등록된 키워드가 없습니다</p>
              ) : (
                <div className="space-y-2">
                  {v_7a80c2.map((v_0dcbd9) => (
                    <div
                      key={v_0dcbd9.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{v_0dcbd9.name}</span>
                        <span className="text-xs text-gray-400">#{v_0dcbd9.display_order}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => v_c5dfdd(v_0dcbd9.id, v_0dcbd9.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
