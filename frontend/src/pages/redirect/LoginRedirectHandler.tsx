import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "@stores/user";
import { useSetRecoilState } from "recoil";
import { fetchUserInfo } from "@/apis/auth";
import { handleAllowNotification } from "@/services/notificationPermission";
const LoginRedirectHandler = () => {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");
  const prevUrl = sessionStorage.getItem("prevUrl");

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  const getToken = (code: string) => {
    axios
      // Proxy LOCAL 로그인
      // .post("/domain/auth/login/kakao", code)

      // 배포 서버 로그인
      .post("https://chuka.kr/api/v1/auth/login/kakao", code)
      .then((res) => {
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["refresh-token"];
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        fetchUserInfo().then((res) => setUserState(res));
        //  여기서
        handleAllowNotification();
        //
        if (accessToken) {
          if (prevUrl) {
            try {
              // URL 파싱
              const parsedUrl = new URL(prevUrl);
              const path = parsedUrl.pathname;

              switch (path) {
                // 메인페이지에서 이벤트 등록시
                case "/":
                  navigate(`/celebrate`);
                  break;
                // 펀딩 drawer 열람시 || 알림 조회시 || 마이페이지 조회시 || navbar로 이벤트 등록시
                default:
                  navigate(`${path}`);
                  break;
              }
            } catch (error) {
              console.error("Invalid URL:", prevUrl);
              navigate("/");
            }
          } else {
            navigate("/");
          }
        } else {
          navigate("/login");
        }
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
