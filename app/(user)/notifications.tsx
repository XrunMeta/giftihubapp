import { PageHeader } from '@/components/PageHeader'
import { useI18n } from '@/context/I18nContext'
import { apiFetch } from '@/services/api'
import { localeToBcp47 } from '@/locales'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Notification = {
  id: string; type: string; title: string; body: string | null
  metadata: string | null; is_read: number; created_at: number
}

const TYPE_ICON: Record<string, string> = {
  user_cancel_request_approved: '✅',
  user_cancel_request_rejected: '❌',
}

export default function UserNotificationsScreen() {
  const { t, locale } = useI18n()
  const [items, setItems] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiFetch<{ notifications: Notification[] }>('/oth-path?limit=50')
      setItems(data.notifications)
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const markRead = async (item: Notification) => {
    if (!item.is_read) {
      await apiFetch(`/oth-path${item.id}/read`, { method: 'PATCH' }).catch(() => {})
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, is_read: 1 } : n)))
    }
  }

  const renderItem = ({ item }: { item: Notification }) => {
    const icon = TYPE_ICON[item.type] ?? '🔔'
    return (
      <Pressable
        onPress={() => markRead(item)}
        className={`mx-4 mb-2 p-4 rounded-xl border ${item.is_read ? 'border-border bg-card' : 'border-primary bg-primary/5'}`}
      >
        <View className="flex-row gap-2 items-start">
          <Text className="text-base">{icon}</Text>
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground">{item.title}</Text>
            {item.body && <Text className="text-xs text-muted-foreground mt-1">{item.body}</Text>}
            <Text className="text-xs text-muted-foreground mt-2">
              {new Date(item.created_at * 1000).toLocaleString(localeToBcp47(locale))}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <PageHeader title={t('user.notifications.title')} />
      {loading ? (
        <ActivityIndicator size="large" color="#CE3630" className="mt-8" />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text className="text-center text-muted-foreground mt-12">
              {t('user.notifications.empty')}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  )
}
