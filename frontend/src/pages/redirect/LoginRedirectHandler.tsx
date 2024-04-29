import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";

const KAKAO_API_KEY = process.env.VITE_KAKAO_API_KEY;
const REDIRECT_URI = process.env.VITE_REDIRECT_URI;

const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      getToken(code).then((res) => {
        console.log(res.access_token);
      })
    }
  }, []);

  const getToken = async (code: string) => {
    const response = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    return response.json()
      // .post(`${BASE_URL}/auth/login/kakao`, code)
      // .then((res) => {
      //   console.log(res.data);
      //   localStorage.setItem("accessToken", res.data.access_token);
      //   navigate("/");
      // })
      // .catch((err) => {
      //   console.error(err);
      // });
  };
  
  return (
    <>
      <p>로그인 처리 중입니다.</p>
    </>
  );
};

export default LoginRedirectHandler;
