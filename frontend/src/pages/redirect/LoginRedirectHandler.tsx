import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code !== null) {
      getToken(code);
    }
  }, [code, navigate]);

  const getToken = (code: string) => {
    const url = "https://kauth.kakao.com/oauth/token";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", KAKAO_API_KEY);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code", code);

    axios
      .post(url, code)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <p>로그인 처리 중입니다.</p>
    </>
  );
};

export default LoginRedirectHandler;
