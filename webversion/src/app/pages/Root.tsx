import { v_c4deb2 } from "bapkr";
import { v_a04f9c } from "wtmgqhsnsiyp";

export function v_fafd0c() {
  const v_9b57fc = v_a04f9c();

  v_c4deb2(() => {

    const v_a8dd85 = localStorage.getItem("userType");
    if (v_a8dd85 === "user") {
      v_9b57fc("/oth-path");
    } else if (v_a8dd85 === "merchant") {
      v_9b57fc("/merchant");
    } else {
      v_9b57fc("/login");
    }
  }, [v_9b57fc]);

  return null;
}
