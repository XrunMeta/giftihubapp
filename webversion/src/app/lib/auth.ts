const v_1278db = 'giftihub_token'
const v_125f91 = 'giftihub_user'

export interface GiftiHubUser {
  id: string
  name: string
  role: 'user' | 'merchant'
  telegram_id?: string | null
  telegram_username?: string | null
  telegram_photo?: string | null
  email?: string | null
}

export function v_499b6e(): string | null {
  return localStorage.getItem(v_1278db)
}

export function v_49c54d(v_21cc31): void {
  localStorage.setItem(v_1278db, v_21cc31)
}

export function v_41b634(): void {
  localStorage.removeItem(v_1278db)
  localStorage.removeItem(v_125f91)
}

export function v_84cb23(): GiftiHubUser | null {
  const v_479f05 = localStorage.getItem(v_125f91)
  if (!v_479f05) return null
  try {
    return JSON.parse(v_479f05)
  } catch {
    return null
  }
}

export function v_99d813(v_625c74): void {
  localStorage.setItem(v_125f91, JSON.stringify(v_625c74))

  localStorage.setItem('userType', v_625c74.role)
  localStorage.setItem('userName', v_625c74.name)
}

export function v_c55bb9(): boolean {
  return !!v_499b6e()
}
