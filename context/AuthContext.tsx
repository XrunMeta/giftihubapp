import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getToken, setToken, removeToken, getRememberMe, getStoredUser, setStoredUser, apiFetch } from "@/services/api";
import type { User } from "@/services/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function decodeJwtPayload(token: string): { sub: string; role: string; exp: number } | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  return Date.now() / 1000 > payload.exp;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const remember = await getRememberMe();
      const storedToken = await getToken();
      if (storedToken && !isTokenExpired(storedToken) && remember) {
        const payload = decodeJwtPayload(storedToken);
        const storedUser = await getStoredUser();

        const fallbackUser: User = storedUser
          ? { id: storedUser.id, name: storedUser.name, role: storedUser.role as "user" | "merchant" }
          : { id: payload!.sub, name: "", role: payload!.role as "user" | "merchant" };
        setState({
          token: storedToken,
          user: fallbackUser,
          isAuthenticated: true,
          isLoading: false,
        });

        try {
          const res = await apiFetch<{ user: User }>("/oth-path");
          if (res.user) {
            const fresh: User = {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              telegram_id: res.user.telegram_id,
              telegram_username: res.user.telegram_username,
              telegram_photo: res.user.telegram_photo,
              role: res.user.role,
            };
            await setStoredUser({ id: fresh.id, name: fresh.name, role: fresh.role });
            setState((s) => ({ ...s, user: fresh }));
          }
        } catch {  }
      } else {
        if (storedToken) await removeToken();
        setState((s) => ({ ...s, isLoading: false }));
      }
    })();
  }, []);

  const login = useCallback(async (token: string, user: User) => {
    await setToken(token);
    await setStoredUser({ id: user.id, name: user.name, role: user.role });
    setState({ token, user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await removeToken();
    setState({ token: null, user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const updateUser = useCallback((user: User) => {
    setStoredUser({ id: user.id, name: user.name, role: user.role });
    setState((s) => ({ ...s, user }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
