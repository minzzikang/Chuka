import { useNavigate } from "react-router-dom";
import * as e from "./EventNull.styled";


const index = () => {
  const navigate = useNavigate();

  return (
    <e.Container>
      <img src="/img/img_event_manage.png" alt="" />
      <e.Wrap>
        <e.Highlight>축하</e.Highlight> {''} 중인 이벤트가 없어요.
      </e.Wrap>
        <e.Text>등록하러 가볼까요?</e.Text>
      <img
        src="/img/img_arrow_btn.png"
        alt=""
        onClick={() => navigate("/celebrate")}
      />
    </e.Container>
  );
};

export default index;
