import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";
import { userState } from "@stores/user";
import { useSetRecoilState } from "recoil";
import { fetchUserInfo, loginSuccess } from "@/apis/auth";

const LoginRedirectHandler = () => {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  const getToken = (code: string) => {
    axios
      .post(`${BASE_URL}/auth/login/kakao`, code)
      .then((res) => {
        // console.log("나와주세요", code);
        console.log("살려줘", res);
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["refresh-token"];
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        // fetchUserInfo().then((res) => setUserState(res.data));
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <p>로그인 처리 중입니다.</p>
    </>
  );
};

export default LoginRedirectHandler;
