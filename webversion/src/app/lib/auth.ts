const TOKEN_KEY = 'giftihub_token'
const USER_KEY = 'giftihub_user'

export interface GiftiHubUser {
  id: string
  name: string
  role: 'user' | 'merchant'
  telegram_id?: string | null
  telegram_username?: string | null
  telegram_photo?: string | null
  email?: string | null
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getUser(): GiftiHubUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setUser(user: GiftiHubUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))

  localStorage.setItem('userType', user.role)
  localStorage.setItem('userName', user.name)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
