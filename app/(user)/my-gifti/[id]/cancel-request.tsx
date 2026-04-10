import { PageHeader } from '@/components/PageHeader'
import { useI18n } from '@/context/I18nContext'
import { apiFetch } from '@/services/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAlertShim } from "@/components/ui/alert-shim";
export default function CancelRequestScreen() {
  const alert = useAlertShim();
  const { t } = useI18n()
  const { id, receipt_code } = useLocalSearchParams<{ id: string; receipt_code?: string }>()
  const router = useRouter()
  const [reasonText, setReasonText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!reasonText.trim()) {
      alert(t('myGifti.cancelRequest.errorTitle'), t('myGifti.cancelRequest.errorBody'))
      return
    }
    setLoading(true)
    try {
      await apiFetch(`/oth-path${id}/cancel-request`, {
        method: 'POST',
        body: JSON.stringify({ reason_text: reasonText }),
      })
      const bodyMsg = receipt_code
        ? `${t('myGifti.cancelRequest.successBody')}\n\n${t('myGifti.cancelRequest.receiptLabel')}: ${receipt_code}`
        : t('myGifti.cancelRequest.successBody')
      alert(
        t('myGifti.cancelRequest.successTitle'),
        bodyMsg,
        [{ text: t('common.confirm'), onPress: () => router.back() }],
      )
    } catch (err: any) {
      alert(t('myGifti.cancelRequest.errorTitle'), err?.message ?? t('myGifti.cancelRequest.errorFail'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <PageHeader title={t('myGifti.cancelRequest.title')} />
      <ScrollView className="flex-1 px-5 pt-4">
        <Text className="text-sm text-muted-foreground mb-2">
          {t('myGifti.cancelRequest.reasonLabel')}
        </Text>
        <TextInput
          className="bg-white border border-border rounded-xl p-4 text-sm text-foreground min-h-[120px]"
          placeholder={t('myGifti.cancelRequest.reasonPlaceholder')}
          placeholderTextColor="#a1a1aa"
          value={reasonText}
          onChangeText={setReasonText}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />
        <Text className="text-xs text-muted-foreground mt-1 text-right">{reasonText.length}/500</Text>
        <Pressable
          className={`mt-6 rounded-xl py-4 items-center ${!reasonText.trim() || loading ? 'bg-muted' : 'bg-destructive'}`}
          onPress={handleSubmit}
          disabled={loading || !reasonText.trim()}
        >
          <Text className="text-white font-semibold text-base">
            {loading ? t('myGifti.cancelRequest.submitting') : t('myGifti.cancelRequest.submitBtn')}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
