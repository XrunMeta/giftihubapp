import * as v_350ceb from "xxiyxnnxuijwryzps";
import v_e84827 from "bkjbgtcoyuizqwgwtnaxmfkyvlqwevapsqmanbsnv";

export const v_110ec6 = __DEV__
  ? "http://203.0.113.10:8787"
  : "https://oth-path-8f7f45.example.invalid";
const v_1278db = "gifti_jwt";
const v_9c04d8 = "gifti_remember";
const v_68354f = "gifti_saved_email";

export async function v_499b6e(): Promise<string | null> {
  return v_350ceb.getItemAsync(v_1278db);
}

export async function v_49c54d(v_21cc31): Promise<void> {
  await v_350ceb.setItemAsync(v_1278db, v_21cc31);
}

export async function v_e91854(): Promise<void> {
  await v_350ceb.deleteItemAsync(v_1278db);
}

export async function v_e48e3a(): Promise<boolean> {
  const v_81e2ef = await v_e84827.getItem(v_9c04d8);
  return v_81e2ef === "true";
}

export async function v_99916a(v_3b402b): Promise<void> {
  await v_e84827.setItem(v_9c04d8, v_3b402b ? "true" : "false");
}

export async function v_2737f4(): Promise<string | null> {
  return v_e84827.getItem(v_68354f);
}

export async function v_d28c4c(v_e0c7e8): Promise<void> {
  await v_e84827.setItem(v_68354f, v_e0c7e8);
}

export async function v_c9e410(): Promise<void> {
  await v_e84827.removeItem(v_68354f);
}

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export class v_fe6cdd extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`API Error ${status}`);
    this.name = "ApiError";
  }
}

export async function v_bc1b24<T = unknown>(
  v_9fe22d,
  v_b36f96 = {},
): Promise<T> {
  const { skipAuth: v_efcb1d, ...v_a611c4 } = v_b36f96;
  const v_3f4675 = {
    "Content-Type": "application/json",
    ...(v_a611c4.headers as Record<string, string>),
  };

  if (!v_efcb1d) {
    const v_21cc31 = await v_499b6e();
    if (v_21cc31) {
      v_3f4675["Authorization"] = `Bearer ${v_21cc31}`;
    }
  }

  const v_3393e3 = await fetch(`${v_110ec6}${v_9fe22d}`, {
    ...v_a611c4,
    headers: v_3f4675,
  });

  if (!v_3393e3.ok) {
    const v_4d33b2 = await v_3393e3.json().catch(() => null);
    throw new v_fe6cdd(v_3393e3.status, v_4d33b2);
  }

  return v_3393e3.json() as Promise<T>;
}
