import { useState, useEffect, createContext, useContext } from "react";
import { BASE_URL } from "@/services/api";

interface DevModeContextType {
  isDevMode: boolean;
  loading: boolean;
}

const DevModeContext = createContext<DevModeContextType>({
  isDevMode: __DEV__,
  loading: true,
});

export function useDevModeProvider(): DevModeContextType {
  const [serverDevMode, setServerDevMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/oth-path`)
      .then((res) => res.json())
      .then((data: { dev_mode: boolean }) => {
        setServerDevMode(data.dev_mode);
      })
      .catch(() => {

      })
      .finally(() => setLoading(false));
  }, []);

  return {
    isDevMode: __DEV__ || serverDevMode,
    loading,
  };
}

export { DevModeContext };

export function useDevMode(): boolean {
  return useContext(DevModeContext).isDevMode;
}
