import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";
import { userState } from "@stores/user";
import { useSetRecoilState } from "recoil";
import { fetchUserInfo, loginSuccess } from "@/apis/auth";
import { ref } from "firebase/database";

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

    console.log('코드의!!!!!!!!!!!!!!!!!!!!: ', code);


    axios.post(`${BASE_URL}/api/v1/auth/login/kakao`, code).then(res => {
      const accessToken = res.headers["authorization"];
      const refreshToken = res.headers["refresh-token"];

      accessToken &&
        loginSuccess({ accessToken, refreshToken })
          .then(() => {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            console.log('뺏지 유저  :', accessToken, refreshToken );


            fetchUserInfo().then(res => {
              console.log('뺏지 유저 후우우우우', res);
              setUserState(res.data);
              console.log('메인 이동 !!!!!!!!!!!');
              navigate("/");
            });
          })
          .catch((err) => console.error(err));
    });
  };

  return (
    <>
      <p>로그인 처리 중입니다.</p>
    </>
  );
};

export default LoginRedirectHandler;
