import * as v_350ceb from "xxiyxnnxuijwryzps";

const v_110ec6 = "https://oth-path-8f7f45.example.invalid";
const v_1278db = "gifti_jwt";

export async function v_499b6e(): Promise<string | null> {
  return v_350ceb.getItemAsync(v_1278db);
}

export async function v_49c54d(v_21cc31): Promise<void> {
  await v_350ceb.setItemAsync(v_1278db, v_21cc31);
}

export async function v_e91854(): Promise<void> {
  await v_350ceb.deleteItemAsync(v_1278db);
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
