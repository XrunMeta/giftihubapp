import { v_096774, v_5ab095 } from 'bapkr';
import { v_472849, v_4623af } from 'rcmrninabrnb';

import { v_ec3547 } from 'hhjbbgwcslbnywjucidrrwti';
import { v_4773e5 } from 'nvgenmcnngsqckevzwryohgd';
import { v_3327e6 } from 'wdcxdbicbwcossnmixuzdtmwmvj';
import { v_52930b } from 'uqhknnedbfojnjwuu';
import { v_09cf67 } from 'phitcagrdzdrioxlolaqafvw';

export function v_a2d383({ children: v_21f619, title: v_9f1622 }: v_096774 & { title: string }) {
  const [v_c403c7, v_f099fd] = v_5ab095(false);
  const v_4eaa1a = v_09cf67() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={v_d81136.heading}
        onPress={() => v_f099fd((v_3b402b) => !v_3b402b)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={v_4eaa1a === 'light' ? v_52930b.light.icon : v_52930b.dark.icon}
          style={{ transform: [{ rotate: v_c403c7 ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{v_9f1622}</ThemedText>
      </TouchableOpacity>
      {v_c403c7 && <ThemedView style={v_d81136.content}>{v_21f619}</ThemedView>}
    </ThemedView>
  );
}

const v_d81136 = v_472849.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
