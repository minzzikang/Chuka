import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";

const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    getToken();
  }, [navigate]);

  const getToken = () => {
    if (code) {
      axios
        .post(`${BASE_URL}/auth/login/kakao`, code)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("accessToken", res.data.access_token);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <p>로그인 처리 중입니다.</p>
    </>
  );
};

export default LoginRedirectHandler;
