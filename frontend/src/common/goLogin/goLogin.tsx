import { useNavigate } from "react-router-dom";


const goLogin = (currentUrl: string) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("access_token");

  // 토큰유무,
  if (accessToken) {

    switch (currentUrl) {
      // 이벤트 등록시 - 메인페이지
      case "/":
        navigate("/celebrate");
        break;

      // 펀딩 등록시 - 롤링페이퍼 drawer바
      case "/celebrate":
        navigate("/celebrate/funding");
        break;

      // 펀딩 참여시 - 디테일 페이지
      case ``:
        navigate("/celebrate/payment");
        break;

      // 알림 조회 시 || 마이페이지 조회시 || navbar로 이벤트 등록시
      default:
        navigate(currentUrl);
        break;
    }
  } else {
    navigate("/login", {state: {from: {currentUrl}}});

  }
  return (
    <div></div>
  )

};


export default goLogin