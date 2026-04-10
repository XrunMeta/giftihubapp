import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Keyword {
  id: number;
  name: string;
  display_order: number;
}

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://giftihubapi.pages.dev/oth-path";

function getToken() {
  return localStorage.getItem("token");
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `API error ${res.status}`);
  return data as T;
}

export function Keywords() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api<{ keywords: Keyword[] }>("/keywords");
      setKeywords(res.keywords);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addKeyword = async () => {
    const name = newName.trim();
    if (!name) return;
    try {
      const maxOrder = keywords.reduce((max, k) => Math.max(max, k.display_order), 0);
      await api("/keywords", {
        method: "POST",
        body: JSON.stringify({ name, display_order: maxOrder + 1 }),
      });
      setNewName("");
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const deleteKeyword = async (id: number, name: string) => {
    if (!confirm(`"${name}" 키워드를 삭제하시겠습니까?`)) return;
    try {
      await api(`/keywords/${id}`, { method: "DELETE" });
      load();
    } catch (e: any) {
      alert(e.message);
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
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="새 키워드 이름"
                  onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button onClick={addKeyword} className="shrink-0">
                  <Plus className="w-4 h-4 mr-1" />
                  추가
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">등록된 키워드 ({keywords.length})</h3>
              {loading ? (
                <p className="text-gray-500 text-sm">로딩 중...</p>
              ) : keywords.length === 0 ? (
                <p className="text-gray-500 text-sm">등록된 키워드가 없습니다</p>
              ) : (
                <div className="space-y-2">
                  {keywords.map((kw) => (
                    <div
                      key={kw.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{kw.name}</span>
                        <span className="text-xs text-gray-400">#{kw.display_order}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteKeyword(kw.id, kw.name)}
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
