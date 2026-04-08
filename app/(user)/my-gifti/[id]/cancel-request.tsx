import { v_258c1c } from 'dkpdpdecefocsdaaoqazekt'
import { v_678659 } from 'sjckgizoxjyhghfnkltjj'
import { v_bc1b24 } from 'tlrvzsbmctdavs'
import { v_d1a7ac, v_d1d90c } from 'rkmroqyctko'
import v_a3453e, { v_5ab095 } from 'bapkr'
import { v_03e392, v_09d0e5, v_122070, v_19b633, v_79c4f2, v_3094a2 } from 'rcmrninabrnb'
import { v_acfdec } from 'vvfgtwbmdpbnvhtfbtbgudicfmpscw'

export default function v_d3556a() {
  const { t: v_8d41d7 } = v_678659()
  const { id: v_389afb } = v_d1a7ac<{ id: string }>()
  const v_904d46 = v_d1d90c()
  const [v_dd6d25, v_663b06] = v_5ab095('')
  const [v_683210, v_34a50a] = v_5ab095(false)

  const v_585b02 = async () => {
    if (!v_dd6d25.trim()) {
      v_03e392.alert(v_8d41d7('myGifti.cancelRequest.errorTitle'), v_8d41d7('myGifti.cancelRequest.errorBody'))
      return
    }
    v_34a50a(true)
    try {
      await v_bc1b24(`/oth-path${v_389afb}/cancel-request`, {
        method: 'POST',
        body: JSON.stringify({ reason_text: v_dd6d25 }),
      })
      v_03e392.alert(
        v_8d41d7('myGifti.cancelRequest.successTitle'),
        v_8d41d7('myGifti.cancelRequest.successBody'),
        [{ text: v_8d41d7('common.confirm'), onPress: () => v_904d46.back() }],
      )
    } catch (v_49263d) {
      v_03e392.alert(v_8d41d7('myGifti.cancelRequest.errorTitle'), v_49263d?.message ?? v_8d41d7('myGifti.cancelRequest.errorFail'))
    } finally {
      v_34a50a(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <PageHeader title={v_8d41d7('myGifti.cancelRequest.title')} />
      <ScrollView className="flex-1 px-5 pt-4">
        <Text className="text-sm text-muted-foreground mb-2">
          {v_8d41d7('myGifti.cancelRequest.reasonLabel')}
        </Text>
        <TextInput
          className="bg-white border border-border rounded-xl p-4 text-sm text-foreground min-h-[120px]"
          placeholder={v_8d41d7('myGifti.cancelRequest.reasonPlaceholder')}
          placeholderTextColor="#a1a1aa"
          value={v_dd6d25}
          onChangeText={v_663b06}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />
        <Text className="text-xs text-muted-foreground mt-1 text-right">{v_dd6d25.length}/500</Text>
        <Pressable
          className={`mt-6 rounded-xl py-4 items-center ${!v_dd6d25.trim() || v_683210 ? 'bg-muted' : 'bg-destructive'}`}
          onPress={v_585b02}
          disabled={v_683210 || !v_dd6d25.trim()}
        >
          <Text className="text-white font-semibold text-base">
            {v_683210 ? v_8d41d7('myGifti.cancelRequest.submitting') : v_8d41d7('myGifti.cancelRequest.submitBtn')}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
