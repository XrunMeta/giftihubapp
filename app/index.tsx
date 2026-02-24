import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter, Link } from "expo-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Gift } from "lucide-react-native";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (type: "user" | "merchant") => {

        router.replace(type === "user" ? "/(tabs)" : "/merchant"); 
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View className="space-y-2 mb-6">
                            <Label>비밀번호</Label>
                            <Input
                                secureTextEntry
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View className="space-y-3 pt-4 flex gap-3">
                            <Button
                                className="w-full bg-orange-600"
                                textClassName="text-white"
                                onPress={() => handleLogin("user")}
                            >
                                사용자로 로그인
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-gray-300"
                                onPress={() => handleLogin("merchant")}
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
