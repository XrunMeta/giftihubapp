import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Root() {
  const navigate = useNavigate();

  useEffect(() => {

    const userType = localStorage.getItem("userType");
    if (userType === "user") {
      navigate("/oth-path");
    } else if (userType === "merchant") {
      navigate("/merchant");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
