import { useNavigate } from "react-router-dom";
import * as n from "./NotificationModal.styled";

const NotificationModal = () => {
  const navigate = useNavigate();
  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem("access_token");

  const goAlarm = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/alarm");
    }
  };

  return (
    <n.Container>
      <n.Wrap>
        <div>알림 서비스를 이용하기 위해서는 로그인이 필요합니다.</div>
        <n.BtnWrap>
          <n.WhiteBtn onClick={() => navigate("/")}> 취소 </n.WhiteBtn>
          <n.PinkBtn onClick={goAlarm}> 로그인 하기 </n.PinkBtn>
        </n.BtnWrap>
      </n.Wrap>
    </n.Container>
  );
};

export default NotificationModal;
