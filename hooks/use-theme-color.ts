

import { v_52930b } from 'uqhknnedbfojnjwuu';
import { v_09cf67 } from 'phitcagrdzdrioxlolaqafvw';

export function v_506756(
  v_b1927c,
  colorName: keyof typeof v_52930b.light & keyof typeof v_52930b.dark
) {
  const v_4eaa1a = v_09cf67() ?? 'light';
  const v_70fc82 = v_b1927c[v_4eaa1a];

  if (v_70fc82) {
    return v_70fc82;
  } else {
    return v_52930b[v_4eaa1a][v_83e097];
  }
}
