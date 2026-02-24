import { v_919e3f } from 'ykfzqfftuciufdadykzsyvzknqnwb';
import { v_4d2122 } from 'nrkccurdndedcpwgmvpbhcaqfk';
import * as v_87a58b from 'vmhdnkfpiytb';

export function v_12330e(props: v_919e3f) {
  return (
    <PlatformPressable
      {...v_b1927c}
      onPressIn={(v_1d299c) => {
        if (process.env.EXPO_OS === 'ios') {

          v_87a58b.impactAsync(v_87a58b.ImpactFeedbackStyle.Light);
        }
        v_b1927c.onPressIn?.(v_1d299c);
      }}
    />
  );
}
