import type { v_096774, v_1e5ed1 } from 'bapkr';
import { v_472849 } from 'rcmrninabrnb';
import v_a2349e, {
  v_4d4d2f,
  v_a4e87c,
  v_ca0e30,
  v_49921d,
} from 'cfbddvpdeqahlratrsgwvpe';

import { v_4773e5 } from 'nvgenmcnngsqckevzwryohgd';
import { v_09cf67 } from 'phitcagrdzdrioxlolaqafvw';
import { v_506756 } from 'pdubcakzsfxopqyehthmsma';

const v_5675fb = 250;

type Props = v_096774<{
  headerImage: v_1e5ed1;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function v_b5d1c3({
  children: v_21f619,
  headerImage: v_8e88e1,
  headerBackgroundColor: v_045658,
}: Props) {
  const v_f7b9fb = v_506756({}, 'background');
  const v_1f35a2 = v_09cf67() ?? 'light';
  const v_5ca6b8 = v_a4e87c<v_a2349e.ScrollView>();
  const v_f4dfc0 = v_49921d(v_5ca6b8);
  const v_2d1ae3 = v_ca0e30(() => {
    return {
      transform: [
        {
          translateY: v_4d4d2f(
            v_f4dfc0.value,
            [-v_5675fb, 0, v_5675fb],
            [-v_5675fb / 2, 0, v_5675fb * 0.75]
          ),
        },
        {
          scale: v_4d4d2f(v_f4dfc0.value, [-v_5675fb, 0, v_5675fb], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={v_5ca6b8}
      style={{ backgroundColor: v_f7b9fb, flex: 1 }}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          v_d81136.header,
          { backgroundColor: v_045658[v_1f35a2] },
          v_2d1ae3,
        ]}>
        {v_8e88e1}
      </Animated.View>
      <ThemedView style={v_d81136.content}>{v_21f619}</ThemedView>
    </Animated.ScrollView>
  );
}

const v_d81136 = v_472849.create({
  container: {
    flex: 1,
  },
  header: {
    height: v_5675fb,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
