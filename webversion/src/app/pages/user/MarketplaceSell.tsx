import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ArrowLeft, Tag, AlertTriangle, Loader2, CheckCircle } from "lucide-react";
import { marketplaceApi, vouchersApi, type Voucher } from "../../lib/api";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "food", label: "음식" },
  { value: "culture", label: "문화" },
  { value: "convenience", label: "편의점" },
  { value: "beauty", label: "뷰티" },
  { value: "etc", label: "기타" },
];

export function MarketplaceSell() {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [category, setCategory] = useState("etc");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    vouchersApi
      .getMyVouchers({ status: "active" })
      .then((data) => setVouchers(data.vouchers))
      .catch((e) => setError(e instanceof Error ? e.message : "기프티 목록을 불러오지 못했습니다"))
      .finally(() => setLoading(false));
  }, []);

  const selected = vouchers.find((v) => v.id === selectedId);
  const price = Number(sellingPrice) || 0;
  const fee = Math.round(price * 0.05);
  const payout = price - fee;

  const handleSubmit = async () => {
    if (!selectedId || price <= 0) {
      setError("기프티를 선택하고 판매가를 입력해주세요");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await marketplaceApi.createListing({
        voucher_id: selectedId,
        selling_price: price,
        category,
      });
      toast.success("판매 등록이 완료되었습니다");
      navigate("/oth-path");
    } catch (e) {
      setError(e instanceof Error ? e.message : "판매 등록에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">판매 등록</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="font-semibold">판매할 기프티 선택</Label>
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : vouchers.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">판매 가능한 기프티가 없습니다</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {vouchers.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedId(v.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedId === v.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">{v.brand}</p>
                          <p className="font-medium text-sm">{v.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">${v.face_value.toLocaleString()}</p>
                          {v.expiry_date && (
                            <p className="text-xs text-gray-400">
                              ~{new Date(v.expiry_date * 1000).toLocaleDateString("ko-KR")}
                            </p>
                          )}
                        </div>
                        {selectedId === v.id && (
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
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              {price > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">판매가</span>
                    <span>${price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">수수료 (5%)</span>
                    <span className="text-red-500">-${fee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t font-semibold">
                    <span>수령액</span>
                    <span className="text-orange-600">${payout.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div>
                <Label className="font-semibold">카테고리</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
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

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {error}
            </div>
          )}

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
            onClick={handleSubmit}
            disabled={submitting || !selectedId || price <= 0}
          >
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Tag className="w-5 h-5 mr-2" />
            판매 등록
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
