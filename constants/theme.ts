

import { v_326be8 } from 'rcmrninabrnb';

const v_5c9b13 = '#0a7ea4';
const v_d5e7a4 = '#fff';

export const v_52930b = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: v_5c9b13,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: v_5c9b13,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: v_d5e7a4,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: v_d5e7a4,
  },
};

export const v_a5e02d = v_326be8.select({
  ios: {

    sans: 'system-ui',

    serif: 'ui-serif',

    rounded: 'ui-rounded',

    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
