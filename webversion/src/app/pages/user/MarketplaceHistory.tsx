import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_6185b9 } from "../../components/ui/badge";
import { v_1a40c4 } from "../../components/ui/button";
import { v_373248, v_2b3568, v_40f7a7, v_ed7019 } from "../../components/ui/tabs";
import {
  v_c2fdd1,
  v_1efbac,
  v_0c1bc0,
  v_bdaafa,
  v_8c709b,
  v_d49c66,
} from "../../components/ui/dialog";
import { v_c71054, v_4013d8, v_e4f0c5 } from "nchqfqoebgwu";
import { v_75ac97, type v_ff021d } from "../../lib/api";
import { v_da74fa } from "gwlruk";

const v_df823e = {
  active: { label: "판매중", className: "bg-orange-500 text-white" },
  sold: { label: "판매완료", className: "bg-green-500 text-white" },
  cancelled: { label: "취소됨", className: "bg-gray-400 text-white" },
};

export function v_366444() {
  const v_9b57fc = v_a04f9c();
  const [v_11083e, v_94ee83] = v_5ab095("sell");
  const [v_a154db, v_1cfd4d] = v_5ab095<(v_ff021d & { status?: string })[]>([]);
  const [v_b265c8, v_f8259b] = v_5ab095<v_ff021d[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);

  const v_4fa913 = async () => {
    v_34a50a(true);
    try {
      const [v_63d4d0, v_3c94b4] = await Promise.all([
        v_75ac97.getMyListings(),
        v_75ac97.getMyPurchases(),
      ]);
      v_1cfd4d(v_63d4d0.listings);
      v_f8259b(v_3c94b4.purchases);
    } catch {}
    v_34a50a(false);
  };

  v_c4deb2(() => { v_4fa913(); }, []);

  const v_5ca23e = async (v_389afb) => {
    try {
      await v_75ac97.cancelListing(v_389afb);
      v_da74fa.success("판매가 취소되었습니다");
      v_4fa913();
    } catch (v_9e86fd) {
      v_da74fa.error(v_9e86fd instanceof Error ? v_9e86fd.message : "취소에 실패했습니다");
    }
  };

  const v_30e908 = ({ item: v_8c0b26, showCancel: v_937feb }: { item: v_ff021d & { status?: string }; showCancel?: boolean }) => {
    const v_d308b5 = v_df823e[(v_8c0b26 as any).status] ?? v_df823e.active;
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500">{v_8c0b26.brand}</p>
              <h3 className="font-semibold text-sm">{v_8c0b26.name}</h3>
            </div>
            <Badge className={v_d308b5.className}>{v_d308b5.label}</Badge>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 line-through">${v_8c0b26.original_price.toLocaleString()}</p>
              <p className="text-lg font-bold text-orange-600">${v_8c0b26.selling_price.toLocaleString()}</p>
            </div>
            {v_937feb && (v_8c0b26 as any).status === "active" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">
                    취소
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>판매 취소</DialogTitle>
                    <DialogDescription>
                      "{v_8c0b26.name}" 판매를 취소하시겠습니까? 기프티가 다시 사용 가능해집니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 justify-end pt-4">
                    <Button variant="outline">돌아가기</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => v_5ca23e(v_8c0b26.id)}>
                      취소 확인
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">내 거래내역</h1>
        </div>

        <div className="p-4">
          <Tabs value={v_11083e} onValueChange={v_94ee83}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sell">판매</TabsTrigger>
              <TabsTrigger value="buy">구매</TabsTrigger>
            </TabsList>

            {v_683210 ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
              </div>
            ) : (
              <>
                <TabsContent value="sell" className="space-y-3 mt-4">
                  {v_a154db.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">판매 내역이 없습니다</div>
                  ) : (
                    v_a154db.map((v_8c0b26) => (
                      <ListingCard key={v_8c0b26.id} item={v_8c0b26} showCancel />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="buy" className="space-y-3 mt-4">
                  {v_b265c8.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">구매 내역이 없습니다</div>
                  ) : (
                    v_b265c8.map((v_8c0b26) => (
                      <ListingCard key={v_8c0b26.id} item={v_8c0b26} />
                    ))
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </UserLayout>
  );
}
