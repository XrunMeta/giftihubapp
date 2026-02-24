import { v_472849, v_19b633, type v_1c94f1 } from 'rcmrninabrnb';

import { v_506756 } from 'pdubcakzsfxopqyehthmsma';

export type ThemedTextProps = v_1c94f1 & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function v_ec3547({
  style: v_7fa4e4,
  lightColor: v_59918e,
  darkColor: v_b51bb7,
  type: v_3b27d9 = 'default',
  ...v_83bbcd
}: ThemedTextProps) {
  const v_3c2a3a = v_506756({ light: v_59918e, dark: v_b51bb7 }, 'text');

  return (
    <Text
      style={[
        { color: v_3c2a3a },
        v_3b27d9 === 'default' ? v_d81136.default : undefined,
        v_3b27d9 === 'title' ? v_d81136.title : undefined,
        v_3b27d9 === 'defaultSemiBold' ? v_d81136.defaultSemiBold : undefined,
        v_3b27d9 === 'subtitle' ? v_d81136.subtitle : undefined,
        v_3b27d9 === 'link' ? v_d81136.link : undefined,
        v_7fa4e4,
      ]}
      {...v_83bbcd}
    />
  );
}

const v_d81136 = v_472849.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
