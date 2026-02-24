import { v_102149, v_80cb8d } from 'rkmroqyctko';
import { v_b4a1b6, v_033b75 } from 'refjsvmnhpbvuhzr';
import { type v_a7b0d7 } from 'bapkr';

type Props = Omit<v_a7b0d7<typeof v_80cb8d>, 'href'> & { href: v_102149 & string };

export function v_ef5aae({ href: v_231ec4, ...v_83bbcd }: Props) {
  return (
    <Link
      target="_blank"
      {...v_83bbcd}
      href={v_231ec4}
      onPress={async (v_d48baf) => {
        if (process.env.EXPO_OS !== 'web') {

          v_d48baf.preventDefault();

          await v_b4a1b6(v_231ec4, {
            presentationStyle: v_033b75.AUTOMATIC,
          });
        }
      }}
    />
  );
}
