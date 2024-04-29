import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      axios
        .post(`${BASE_URL}/auth/login/kakao`, { code })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);
  return <>auth</>;
};

export default LoginRedirectHandler;
