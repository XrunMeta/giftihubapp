import { v_258c1c } from 'dkpdpdecefocsdaaoqazekt'
import { v_678659 } from 'sjckgizoxjyhghfnkltjj'
import { v_bc1b24 } from 'tlrvzsbmctdavs'
import { v_58169c } from 'ozkdkvoil'
import v_a3453e, { v_de06a3, v_c4deb2, v_5ab095 } from 'bapkr'
import { v_39a996, v_9cabcb, v_09d0e5, v_19b633, v_3094a2 } from 'rcmrninabrnb'
import { v_acfdec } from 'vvfgtwbmdpbnvhtfbtbgudicfmpscw'

type Notification = {
  id: string; type: string; title: string; body: string | null
  metadata: string | null; is_read: number; created_at: number
}

const v_754db4 = {
  user_cancel_request_approved: '✅',
  user_cancel_request_rejected: '❌',
}

export default function v_301c5f() {
  const { t: v_8d41d7, locale: v_6f298b } = v_678659()
  const [v_4622b9, v_fa923c] = v_5ab095<Notification[]>([])
  const [v_683210, v_34a50a] = v_5ab095(true)

  const v_f6f5de = v_de06a3(async () => {
    v_34a50a(true)
    try {
      const v_9390e8 = await v_bc1b24<{ notifications: Notification[] }>('/oth-path?limit=50')
      v_fa923c(v_9390e8.notifications)
    } catch {}
    v_34a50a(false)
  }, [])

  v_c4deb2(() => { v_f6f5de() }, [v_f6f5de])

  const v_8c796a = async (v_8c0b26) => {
    if (!v_8c0b26.is_read) {
      await v_bc1b24(`/oth-path${v_8c0b26.id}/read`, { method: 'PATCH' }).catch(() => {})
      v_fa923c((v_ba2215) => v_ba2215.map((v_f4e98d) => (v_f4e98d.id === v_8c0b26.id ? { ...v_f4e98d, is_read: 1 } : v_f4e98d)))
    }
  }

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: Notification }) => {
    const v_9ddfab = v_754db4[v_8c0b26.type] ?? '🔔'
    return (
      <Pressable
        onPress={() => v_8c796a(v_8c0b26)}
        className={`mx-4 mb-2 p-4 rounded-xl border ${v_8c0b26.is_read ? 'border-border bg-card' : 'border-primary bg-primary/5'}`}
      >
        <View className="flex-row gap-2 items-start">
          <Text className="text-base">{v_9ddfab}</Text>
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground">{v_8c0b26.title}</Text>
            {v_8c0b26.body && <Text className="text-xs text-muted-foreground mt-1">{v_8c0b26.body}</Text>}
            <Text className="text-xs text-muted-foreground mt-2">
              {new Date(v_8c0b26.created_at * 1000).toLocaleString(v_58169c(v_6f298b))}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <PageHeader title={v_8d41d7('user.notifications.title')} />
      {v_683210 ? (
        <ActivityIndicator size="large" color="#CE3630" className="mt-8" />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={v_4622b9}
          keyExtractor={(v_ebec57) => v_ebec57.id}
          renderItem={v_fcf6ec}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text className="text-center text-muted-foreground mt-12">
              {v_8d41d7('user.notifications.empty')}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  )
}
