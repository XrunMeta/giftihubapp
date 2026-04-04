import { v_5ab095, v_c4deb2, v_af12cb, v_76a8a9 } from "bapkr";
import { v_110ec6 } from "tlrvzsbmctdavs";

interface DevModeContextType {
  isDevMode: boolean;
  loading: boolean;
}

const v_72e65b = v_af12cb<DevModeContextType>({
  isDevMode: __DEV__,
  loading: true,
});

export function v_e76876(): DevModeContextType {
  const [v_3f52a0, v_4fcd86] = v_5ab095(false);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    fetch(`${v_110ec6}/oth-path`)
      .then((v_8f00b9) => v_8f00b9.json())
      .then((v_9390e8) => {
        v_4fcd86(v_9390e8.dev_mode);
      })
      .catch(() => {

      })
      .finally(() => v_34a50a(false));
  }, []);

  return {
    isDevMode: __DEV__ || v_3f52a0,
    loading: v_683210,
  };
}

export { v_72e65b };

export function v_f589a4(): boolean {
  return v_76a8a9(v_72e65b).isDevMode;
}
