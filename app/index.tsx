import v_a3453e, { v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_e767d1, v_326be8, v_122070 } from "rcmrninabrnb";
import { v_d1d90c, v_80cb8d } from "rkmroqyctko";
import { v_1a40c4 } from "../components/ui/button";
import { v_1b353f } from "../components/ui/input";
import { v_92fe6b } from "../components/ui/label";
import { v_2dc782, v_e7d43c, v_5a8798, v_6a2c3c, v_5f0914 } from "../components/ui/card";
import { v_84fd28 } from "wjvlskvsbzsrojdbjsl";

export default function v_b11d5d() {
    const v_904d46 = v_d1d90c();
    const [v_e0c7e8, v_fedf34] = v_5ab095("");
    const [v_adc076, v_52b279] = v_5ab095("");

    const v_ec4736 = (v_3b27d9) => {

        v_904d46.replace(v_3b27d9 === "user" ? "/(tabs)" : "/merchant"); 
    };

    return (
        <KeyboardAvoidingView
            behavior={v_326be8.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-50"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 16 }}>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader className="items-center text-center">
                        <View className="flex flex-row justify-center mb-4">
                            <View className="bg-orange-600 p-4 rounded-full">
                                <Gift size={32} color="white" />
                            </View>
                        </View>
                        <CardTitle className="text-2xl text-center">GiftiHub에 오신 것을 환영합니다</CardTitle>
                        <CardDescription className="text-center font-medium">디지털 기프티 플랫폼</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <View className="space-y-2 mb-4">
                            <Label>이메일</Label>
                            <Input
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="email@example.com"
                                value={v_e0c7e8}
                                onChangeText={v_fedf34}
                            />
                        </View>
                        <View className="space-y-2 mb-6">
                            <Label>비밀번호</Label>
                            <Input
                                secureTextEntry
                                placeholder="••••••••"
                                value={v_adc076}
                                onChangeText={v_52b279}
                            />
                        </View>

                        <View className="space-y-3 pt-4 flex gap-3">
                            <Button
                                className="w-full bg-orange-600"
                                textClassName="text-white"
                                onPress={() => v_ec4736("user")}
                            >
                                사용자로 로그인
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-gray-300"
                                onPress={() => v_ec4736("merchant")}
                            >
                                가맹점으로 로그인
                            </Button>
                        </View>

                        <View className="flex flex-row justify-center items-center mt-6">
                            <Text className="text-sm text-gray-600">계정이 없으신가요? </Text>
                            <Link href="/signup" asChild>
                                <Text className="text-orange-600 font-medium ml-1">
                                    회원가입
                                </Text>
                            </Link>
                        </View>
                    </CardContent>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
