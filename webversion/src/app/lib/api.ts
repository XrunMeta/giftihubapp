import { v_499b6e, v_41b634 } from './auth'

const v_cc9198 = import.meta.env.VITE_API_BASE ?? 'https://oth-path-8f7f45.example.invalid/oth-path'

async function v_bc1b24<T = unknown>(v_9fe22d, v_b36f96 = {}): Promise<T> {
  const v_21cc31 = v_499b6e()
  const v_3f4675 = {
    'Content-Type': 'application/json',
    ...(v_b36f96.headers as Record<string, string> ?? {}),
  }
  if (v_21cc31) v_3f4675['Authorization'] = `Bearer ${v_21cc31}`

  const v_8f00b9 = await fetch(`${v_cc9198}${v_9fe22d}`, { ...v_b36f96, headers: v_3f4675 })

  if (v_8f00b9.status === 401) {
    v_41b634()
    window.location.href = '/login'
    throw new Error('인증이 만료되었습니다')
  }

  const v_9390e8 = await v_8f00b9.json()
  if (!v_8f00b9.ok) throw new Error((v_9390e8 as { error?: string }).error ?? `API 오류 (${v_8f00b9.status})`)
  return v_9390e8 as T
}

export const v_3abe27 = {
  login(v_e0c7e8, v_adc076, v_b6d4b8) {
    return v_bc1b24<{ token: string; user: { id: string; name: string; role: string } }>(
      '/oth-path',
      { method: 'POST', body: JSON.stringify({ email: v_e0c7e8, password: v_adc076, device_id: v_b6d4b8 }) },
    )
  },
  register(v_e0c7e8, v_adc076, v_1833e7, v_b6d4b8) {
    return v_bc1b24<{ token: string; user: { id: string; name: string; role: string } }>(
      '/oth-path',
      { method: 'POST', body: JSON.stringify({ email: v_e0c7e8, password: v_adc076, name: v_1833e7, device_id: v_b6d4b8 }) },
    )
  },
  telegram(v_b673dc, v_b6d4b8, v_34be0d) {
    return v_bc1b24<{
      token: string
      device_id: string
      is_new: boolean
      user: { id: string; name: string; role: string; telegram_id: string }
    }>('/oth-path', {
      method: 'POST',
      body: JSON.stringify({ ...v_b673dc, device_id: v_b6d4b8, dev_mode: v_34be0d }),
    })
  },
}

export const v_aef059 = {
  getDevMode() {
    return v_bc1b24<{ dev_mode: boolean }>('/system/dev-mode')
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

export const v_75ac97 = {
  getListings(v_24baff) {
    const v_212049 = new URLSearchParams()
    if (v_24baff?.category) v_212049.set('category', v_24baff.category)
    if (v_24baff?.q) v_212049.set('q', v_24baff.q)
    if (v_24baff?.sort) v_212049.set('sort', v_24baff.sort)
    const v_7c5791 = v_212049.toString()
    return v_bc1b24<{ listings: MarketplaceListing[] }>(`/oth-path${v_7c5791 ? `?${v_7c5791}` : ''}`)
  },

  getDetail(v_389afb) {
    return v_bc1b24<{ listing: MarketplaceDetail }>(`/oth-path${v_389afb}`)
  },

  createListing(v_4d33b2) {
    return v_bc1b24<{ listing: MarketplaceListing }>('/oth-path', {
      method: 'POST',
      body: JSON.stringify(v_4d33b2),
    })
  },

  cancelListing(v_389afb) {
    return v_bc1b24<{ ok: boolean }>(`/oth-path${v_389afb}`, { method: 'DELETE' })
  },

  purchase(v_389afb, v_4d33b2) {
    return v_bc1b24<{
      payment_id: string
      status?: string
      redirect_url?: string
      wallet_address?: string
      amount_usdt?: number
      amount_usd?: number
      status_url?: string
    }>(`/oth-path${v_389afb}/purchase`, {
      method: 'POST',
      body: JSON.stringify(v_4d33b2),
    })
  },

  getMyListings() {
    return v_bc1b24<{ listings: MarketplaceListing[] }>('/oth-path')
  },

  getMyPurchases() {
    return v_bc1b24<{ purchases: MarketplaceListing[] }>('/oth-path')
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

export const v_8b2e79 = {
  getMyVouchers(v_24baff) {
    const v_212049 = new URLSearchParams()
    if (v_24baff?.status) v_212049.set('status', v_24baff.status)
    const v_7c5791 = v_212049.toString()
    return v_bc1b24<{ vouchers: Voucher[] }>(`/vouchers${v_7c5791 ? `?${v_7c5791}` : ''}`)
  },
}
