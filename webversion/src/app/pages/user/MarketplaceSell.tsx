import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_1b353f } from "../../components/ui/input";
import { v_92fe6b } from "../../components/ui/label";
import {
  v_ed7c3b,
  v_38670c,
  v_63e833,
  v_afb4f7,
  v_36bbe2,
} from "../../components/ui/select";
import { v_c71054, v_7dc841, v_3d81ea, v_4013d8, v_24c64e } from "nchqfqoebgwu";
import { v_75ac97, v_8b2e79, type v_7fb3de } from "../../lib/api";
import { v_da74fa } from "gwlruk";

const v_6e79a1 = [
  { value: "food", label: "음식" },
  { value: "culture", label: "문화" },
  { value: "convenience", label: "편의점" },
  { value: "beauty", label: "뷰티" },
  { value: "etc", label: "기타" },
];

export function v_6a39e0() {
  const v_9b57fc = v_a04f9c();
  const [v_f9fd27, v_3a2126] = v_5ab095<v_7fb3de[]>([]);
  const [v_2b330f, v_3e8aa4] = v_5ab095("");
  const [v_7ae44d, v_27a321] = v_5ab095("");
  const [v_8b9cd4, v_f38b96] = v_5ab095("etc");
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_cb66b4, v_ee9ec1] = v_5ab095(false);
  const [v_5e9bfe, v_3a7d09] = v_5ab095("");

  v_c4deb2(() => {
    v_8b2e79
      .getMyVouchers({ status: "active" })
      .then((v_9390e8) => v_3a2126(v_9390e8.vouchers))
      .catch((v_9e86fd) => v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "기프티 목록을 불러오지 못했습니다"))
      .finally(() => v_34a50a(false));
  }, []);

  const v_587413 = v_f9fd27.find((v_81e2ef) => v_81e2ef.id === v_2b330f);
  const v_6bbb57 = Number(v_7ae44d) || 0;
  const v_2d815e = Math.round(v_6bbb57 * 0.05);
  const v_daa996 = v_6bbb57 - v_2d815e;

  const v_585b02 = async () => {
    if (!v_2b330f || v_6bbb57 <= 0) {
      v_3a7d09("기프티를 선택하고 판매가를 입력해주세요");
      return;
    }
    v_ee9ec1(true);
    v_3a7d09("");
    try {
      await v_75ac97.createListing({
        voucher_id: v_2b330f,
        selling_price: v_6bbb57,
        category: v_8b9cd4,
      });
      v_da74fa.success("판매 등록이 완료되었습니다");
      v_9b57fc("/oth-path");
    } catch (v_9e86fd) {
      v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "판매 등록에 실패했습니다");
    } finally {
      v_ee9ec1(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">판매 등록</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="font-semibold">판매할 기프티 선택</Label>
              {v_683210 ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : v_f9fd27.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">판매 가능한 기프티가 없습니다</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {v_f9fd27.map((v_81e2ef) => (
                    <button
                      key={v_81e2ef.id}
                      onClick={() => v_3e8aa4(v_81e2ef.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        v_2b330f === v_81e2ef.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">{v_81e2ef.brand}</p>
                          <p className="font-medium text-sm">{v_81e2ef.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">${v_81e2ef.face_value.toLocaleString()}</p>
                          {v_81e2ef.expiry_date && (
                            <p className="text-xs text-gray-400">
                              ~{new Date(v_81e2ef.expiry_date * 1000).toLocaleDateString("ko-KR")}
                            </p>
                          )}
                        </div>
                        {v_2b330f === v_81e2ef.id && (
                          <CheckCircle className="w-5 h-5 text-orange-500 ml-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div>
                <Label htmlFor="price" className="font-semibold">판매가 (USD)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input
                    id="price"
                    type="number"
                    min={1}
                    placeholder="0"
                    value={v_7ae44d}
                    onChange={(v_9e86fd) => v_27a321(v_9e86fd.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              {v_6bbb57 > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">판매가</span>
                    <span>${v_6bbb57.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">수수료 (5%)</span>
                    <span className="text-red-500">-${v_2d815e.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t font-semibold">
                    <span>수령액</span>
                    <span className="text-orange-600">${v_daa996.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div>
                <Label className="font-semibold">카테고리</Label>
                <Select value={v_8b9cd4} onValueChange={v_f38b96}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {v_6e79a1.map((v_3f4e2e) => (
                      <SelectItem key={v_3f4e2e.value} value={v_3f4e2e.value}>{v_3f4e2e.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {}
          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-700">
              판매 등록 시 해당 기프티는 사용, 양도, 환불이 불가합니다. 판매를 취소하면 다시 사용할 수 있습니다.
            </p>
          </div>

          {v_5e9bfe && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {v_5e9bfe}
            </div>
          )}

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
            onClick={v_585b02}
            disabled={v_cb66b4 || !v_2b330f || v_6bbb57 <= 0}
          >
            {v_cb66b4 && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Tag className="w-5 h-5 mr-2" />
            판매 등록
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
