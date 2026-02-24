import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { mockGiftis } from "../../data/mockData";

interface SearchResult {
  id: string;
  name: string;
  email: string;
}

export function GiftiTransfer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gifti = mockGiftis.find((g) => g.id === id);
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<SearchResult | null>(null);

  if (!gifti) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>기프티를 찾을 수 없습니다</p>
        </div>
      </UserLayout>
    );
  }

  const handleSearch = () => {

    if (email.includes("@")) {
      setSearchResults([
        {
          id: "1",
          name: "김*수",
          email: "ki***@gmail.com",
        },
      ]);
      setSelectedRecipient(null);
    } else {
      setSearchResults([]);
      setSelectedRecipient(null);
    }
  };

  const handleSelectRecipient = (recipient: SearchResult) => {
    setSelectedRecipient(recipient);
    setSearchResults([]);
  };

  const handleTransfer = (recipient: SearchResult) => {

    console.log("Transferring to recipient:", recipient);
    sessionStorage.setItem('transferRecipient', JSON.stringify(recipient));
    navigate(`/oth-path${id}/transfer-confirm`);
  };

  const exchangeRate = 1385;
  const balanceInKRW = Math.round(gifti.balance * exchangeRate);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">기프티 양도</h1>
        </div>

        <div className="p-4 space-y-6">
          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              양도할 기프티
            </h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{gifti.name}</span>
                    <span className="text-lg font-bold text-orange-600">
                      ${gifti.balance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">잔액</span>
                    <div className="text-right">
                      <span className="font-semibold">
                        ${gifti.balance.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-500">
                        ≈ ₩{balanceInKRW.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              받는 사람 찾기
            </h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              <Button
                onClick={handleSearch}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
            </div>
          </div>

          {}
          {searchResults.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-gray-700">
                검색 결과
              </h2>
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <Card key={result.id} className="cursor-pointer hover:border-orange-600 transition-colors">
                    <CardContent className="p-4">
                      <button 
                        onClick={() => handleSelectRecipient(result)}
                        className="w-full text-left"
                      >
                        <div>
                          <p className="font-semibold">{result.name}</p>
                          <p className="text-sm text-gray-600">{result.email}</p>
                        </div>
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {}
          {selectedRecipient && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-gray-700">
                선택된 받는 사람
              </h2>
              <Card className="border-orange-600">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">{selectedRecipient.name}</p>
                      <p className="text-sm text-gray-600">{selectedRecipient.email}</p>
                    </div>
                    <Button
                      onClick={() => handleTransfer(selectedRecipient)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      이 사람에게 양도
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">양도 수수료</span>
                <span className="font-semibold text-green-600">무료</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">양도 횟수</span>
                <span className="font-semibold">
                  {gifti.transferCount}/3회 사용
                </span>
              </div>
            </CardContent>
          </Card>

          {}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>안내사항</strong>
              <br />• 양도는 최대 3회까지 가능합니다
              <br />• 양도된 기프티는 취소할 수 없습니다
              <br />• 받는 사람의 이메일 주소를 정확히 입력해주세요
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}