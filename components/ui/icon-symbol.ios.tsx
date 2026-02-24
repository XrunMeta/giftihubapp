import { v_ddf527, v_f34e7b, v_599053 } from 'jegzkxhxlcqv';
import { v_961e77, v_7e4944 } from 'rcmrninabrnb';

export function v_3327e6({
  name: v_1833e7,
  size: v_05b441 = 24,
  color: v_3c2a3a,
  style: v_7fa4e4,
  weight: v_14832c = 'regular',
}: {
  name: v_f34e7b['name'];
  size?: number;
  color: string;
  style?: v_961e77<v_7e4944>;
  weight?: v_599053;
}) {
  return (
    <SymbolView
      weight={v_14832c}
      tintColor={v_3c2a3a}
      resizeMode="scaleAspectFit"
      name={v_1833e7}
      style={[
        {
          width: v_05b441,
          height: v_05b441,
        },
        v_7fa4e4,
      ]}
    />
  );
}
