

import v_872acb from 'uzftaqgyqoqvrdnzfwwvdghqbgochtoi';
import { v_599053, v_f34e7b } from 'jegzkxhxlcqv';
import { v_a7b0d7 } from 'bapkr';
import { v_9df34f, type v_961e77, type v_5e8657 } from 'rcmrninabrnb';

type IconMapping = Record<v_f34e7b['name'], v_a7b0d7<typeof v_872acb>['name']>;
type IconSymbolName = keyof typeof v_643c71;

const v_643c71 = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

export function v_3327e6({
  name: v_1833e7,
  size: v_05b441 = 24,
  color: v_3c2a3a,
  style: v_7fa4e4,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | v_9df34f;
  style?: v_961e77<v_5e8657>;
  weight?: v_599053;
}) {
  return <MaterialIcons color={v_3c2a3a} size={v_05b441} name={v_643c71[v_1833e7]} style={v_7fa4e4} />;
}
