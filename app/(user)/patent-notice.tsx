import { PageHeader } from "@/components/PageHeader";
import React from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatentNoticeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title="지식재산권 안내" />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 48 }}>
        {}
        <Text className="text-base font-bold text-foreground mb-2">
          지식재산권(특허권) 보호 안내 및 라이선스 문의
        </Text>
        <Text className="text-sm text-muted-foreground leading-5 mb-4">
          안녕하세요, 기프트허브(Gift Hub) 운영팀입니다.
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-6">
          기프트허브는 사용자 여러분께 보다 안전하고 신뢰할 수 있는 상품권 거래 환경을 제공하기 위해 독자적인 기술력을 바탕으로 서비스를 운영하고 있습니다. 당사가 보유하고 서비스에 적용 중인 핵심 특허권에 대하여 아래와 같이 안내드리오니, 무단 도용으로 인한 법적 분쟁이 발생하지 않도록 유의해 주시기 바랍니다.
        </Text>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            1. 보유 특허권 안내
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-4">
            본 서비스의 핵심 로직과 시스템은 다음의 특허법에 의해 보호받고 있습니다.
          </Text>

          <View className="bg-gray-50 rounded-lg p-3 mb-3">
            <Text className="text-sm font-bold text-primary mb-1">
              특허 제10-1205894호
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              명칭: 가격 바코드를 포함하는 개인페이지를 이용한 전자 상거래 방법 및 시스템
            </Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-sm font-bold text-primary mb-1">
              특허 제10-0561546호
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              명칭: 인터넷 기반 전자 상품권 거래 시스템 및 방법
            </Text>
          </View>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            2. 무단 도용 및 침해 금지 안내
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            위 적시된 특허권은 기프트허브의 소중한 지식재산이며, 당사의 명시적인 서면 동의 없이 기술을 무단 복제, 배포, 변형하거나 유사한 비즈니스 모델을 구축하는 행위는 특허법 및 부정경쟁방지법에 위반됩니다.
          </Text>
          <Text className="text-sm text-foreground leading-5">
            특히 침해 사실이 확인될 경우, 관련 법령에 의거하여 별도의 사전 경고 없이 민·형사상의 법적 조치(손해배상 청구, 서비스 중지 가처분, 형사 고소 등)가 엄격히 진행될 수 있음을 알려드립니다.
          </Text>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            3. 특허권 사용 및 라이선스 문의
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            기프트허브의 특허 기술을 합법적으로 사용하고자 하거나, 통상실시권(License) 계약에 대한 협의가 필요한 기업 및 개인은 아래 공식 창구를 통해 문의해 주시기 바랍니다. 정식 절차를 거치지 않은 모든 형태의 기술 사용은 법적 분쟁의 대상이 될 수 있습니다.
          </Text>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-xs text-muted-foreground mb-1">문의 이메일</Text>
            <Pressable onPress={() => Linking.openURL("mailto:oth-staff@example.invalid")}>
              <Text className="text-sm font-semibold text-primary underline">
                oth-staff@example.invalid
              </Text>
            </Pressable>
            <Text className="text-xs text-muted-foreground mt-2 leading-4">
              내용: 기술 사용 목적, 업체명, 담당자 연락처 기재 필수
            </Text>
          </View>
        </View>

        {}
        <Text className="text-sm text-foreground leading-5 mb-2">
          기프트허브는 기술적 가치를 존중하며 건전한 모바일 커머스 생태계를 만들기 위해 최선을 다하겠습니다. 이용자 및 관련 업계 관계자분들의 적극적인 협조 부탁드립니다.
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-2">감사합니다.</Text>
        <Text className="text-sm font-semibold text-foreground">기프트허브 운영팀 드림</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
