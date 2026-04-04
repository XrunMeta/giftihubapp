import { v_bc1b24 } from "./api";

export async function v_8d53e7(): Promise<boolean> {
  const v_8f00b9 = await v_bc1b24<{ dev_mode: boolean }>("/oth-path", {
    skipAuth: true,
  });
  return v_8f00b9.dev_mode;
}
