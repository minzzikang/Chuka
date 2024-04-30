import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";


const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, []);

  const getToken = (code: string) => {
    axios
      .post(`${BASE_URL}/auth/login/kakao`, code)
      .then((res) => {
        let accessToken = res.headers.authorization;
        console.log(accessToken);
        localStorage.setItem("access_token", accessToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
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
