import '../global.css';
import { v_6e1a2d, v_742f47, v_373784 } from 'ixigazcpvfldbecwtbvavtbi';
import { v_cb3606 } from 'rkmroqyctko';
import { v_b5df25 } from 'ernurodqvmtspux';
import 'cfbddvpdeqahlratrsgwvpe';

import { v_09cf67 } from 'phitcagrdzdrioxlolaqafvw';



export default function v_5d2b63() {
  const v_1f35a2 = v_09cf67();

  return (
    <ThemeProvider value={v_1f35a2 === 'dark' ? v_6e1a2d : v_742f47}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
