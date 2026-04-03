import { getToken, clearToken } from './auth'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://giftihubapi.pages.dev/oth-path'

async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> ?? {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    clearToken()
    window.location.href = '/login'
    throw new Error('인증이 만료되었습니다')
  }

  const data = await res.json()
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `API 오류 (${res.status})`)
  return data as T
}

export const authApi = {
  login(email: string, password: string, device_id?: string) {
    return apiFetch<{ token: string; user: { id: string; name: string; role: string } }>(
      '/oth-path',
      { method: 'POST', body: JSON.stringify({ email, password, device_id }) },
    )
  },
  register(email: string, password: string, name: string, device_id?: string) {
    return apiFetch<{ token: string; user: { id: string; name: string; role: string } }>(
      '/oth-path',
      { method: 'POST', body: JSON.stringify({ email, password, name, device_id }) },
    )
  },
  telegram(tgData: Record<string, unknown>, device_id?: string, dev_mode?: boolean) {
    return apiFetch<{
      token: string
      device_id: string
      is_new: boolean
      user: { id: string; name: string; role: string; telegram_id: string }
    }>('/oth-path', {
      method: 'POST',
      body: JSON.stringify({ ...tgData, device_id, dev_mode }),
    })
  },
}

export const systemApi = {
  getDevMode() {
    return apiFetch<{ dev_mode: boolean }>('/system/dev-mode')
  },
}

export interface MarketplaceListing {
  id: string
  brand: string
  name: string
  original_price: number
  selling_price: number
  discount: number
  category: string
  expiry_date: number
  created_at: number
  seller_name: string
  image_url?: string
  thumb_url?: string
  brand_logo?: string
}

export interface MarketplaceDetail extends MarketplaceListing {
  seller_id: string
  voucher_id: string
  status: string
}

export const marketplaceApi = {
  getListings(params?: { category?: string; q?: string; sort?: string }) {
    const qs = new URLSearchParams()
    if (params?.category) qs.set('category', params.category)
    if (params?.q) qs.set('q', params.q)
    if (params?.sort) qs.set('sort', params.sort)
    const query = qs.toString()
    return apiFetch<{ listings: MarketplaceListing[] }>(`/oth-path${query ? `?${query}` : ''}`)
  },

  getDetail(id: string) {
    return apiFetch<{ listing: MarketplaceDetail }>(`/oth-path${id}`)
  },

  createListing(body: { voucher_id: string; selling_price: number; category?: string }) {
    return apiFetch<{ listing: MarketplaceListing }>('/oth-path', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  cancelListing(id: string) {
    return apiFetch<{ ok: boolean }>(`/oth-path${id}`, { method: 'DELETE' })
  },

  purchase(id: string, body: { payment_method: string }) {
    return apiFetch<{
      payment_id: string
      status?: string
      redirect_url?: string
      wallet_address?: string
      amount_usdt?: number
      amount_usd?: number
      status_url?: string
    }>(`/oth-path${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  getMyListings() {
    return apiFetch<{ listings: MarketplaceListing[] }>('/oth-path')
  },

  getMyPurchases() {
    return apiFetch<{ purchases: MarketplaceListing[] }>('/oth-path')
  },
}

export interface Voucher {
  id: string
  brand: string
  name: string
  face_value: number
  balance: number
  currency: string
  status: string
  expiry_date: number
  image_url?: string
}

export const vouchersApi = {
  getMyVouchers(params?: { status?: string }) {
    const qs = new URLSearchParams()
    if (params?.status) qs.set('status', params.status)
    const query = qs.toString()
    return apiFetch<{ vouchers: Voucher[] }>(`/vouchers${query ? `?${query}` : ''}`)
  },
}
