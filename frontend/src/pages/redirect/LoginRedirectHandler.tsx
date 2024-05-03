import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/requestMethods";
import { userState } from "@stores/user";
import { useSetRecoilState } from "recoil";
import { fetchUserInfo, loginSuccess } from "@/apis/auth";

const LoginRedirectHandler = () => {
  const setUserState = useSetRecoilState(userState);
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  // const prevUrl = location.state.from;


  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  const getToken = (code: string) => {
    // console.log('데이터야',prevUrl);
    axios
      .post("/domain/auth/login/kakao", code)
      .then((res) => {
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["refresh-token"];
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        fetchUserInfo().then((res) => setUserState(res.data));
        navigate("/");

        // navigate(-1)

        // if (accessToken) {

        //   switch (prevUrl) {
        //     // 이벤트 등록시 - 메인페이지
        //     case "/":
        //       navigate("/celebrate");
        //       break;
      
        //     // 펀딩 등록시 - 롤링페이퍼 drawer바
        //     case "/celebrate":
        //       navigate("/celebrate/funding");
        //       break;
      
        //     // 펀딩 참여시 - 디테일 페이지
        //     case ``:
        //       navigate("/celebrate/payment");
        //       break;
      
        //     // 알림 조회 시 || 마이페이지 조회시 || navbar로 이벤트 등록시
        //     default:
        //       navigate(prevUrl);
        //       break;
        //   }
        // } else {
        //   // navigate("/login", {state: {from: {prevUrl}}});
        //   navigate('/')
      
        // }
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
