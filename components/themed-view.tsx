import { v_3094a2, type v_a27b80 } from 'rcmrninabrnb';

import { v_506756 } from 'pdubcakzsfxopqyehthmsma';

export type ThemedViewProps = v_a27b80 & {
  lightColor?: string;
  darkColor?: string;
};

export function v_4773e5({ style: v_7fa4e4, lightColor: v_59918e, darkColor: v_b51bb7, ...v_b9ca98 }: ThemedViewProps) {
  const v_f7b9fb = v_506756({ light: v_59918e, dark: v_b51bb7 }, 'background');

  return <View style={[{ backgroundColor: v_f7b9fb }, v_7fa4e4]} {...v_b9ca98} />;
}
