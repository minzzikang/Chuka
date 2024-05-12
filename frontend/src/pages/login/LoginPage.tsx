import logo from "/img/img_main_logo.png";
import * as l from "@pages/login/LoginPage.styled";
import kakao from "/icon/icon_kakao.png";

const LoginPage = () => {
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const REDIRECT_URI2 = import.meta.env.VITE_REDIRECT_URI2;

  const handleClick = () => {
    // 배포 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 로컬 URL
    const LOCAL_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI2}&response_type=code`;

    window.location.href = kakaoURL;
    // window.location.href = LOCAL_URL;
  };

  return (
    <l.Container>
      <img src={logo} alt="logo" />
      <l.Text>특별한 날,</l.Text>
      <l.FlexRow>
        <l.Text>함께</l.Text>
        <l.Highlight>축하</l.Highlight>
        <l.Text>해요</l.Text>
      </l.FlexRow>
      <l.Button onClick={handleClick}>
        <img src={kakao} alt="kakao" />
        카카오로 시작하기
      </l.Button>
    </l.Container>
  );
};

export default LoginPage;
