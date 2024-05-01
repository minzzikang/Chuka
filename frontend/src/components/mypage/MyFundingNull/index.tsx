import { useNavigate } from "react-router-dom";
import * as f from "./MyFundingNull.styled";

const index = () => {
  const navigate = useNavigate();

  return (
    <f.Container>
      <f.Img src="/img/img_present_funding.png" alt="" />
      <f.Wrap>
        <f.Highlight>등록한</f.Highlight>펀딩이 없어요.
      </f.Wrap>
      <f.Text>등록하러 가볼까요?</f.Text>
      <img
        src="/img/img_arrow_btn.png"
        alt=""
        onClick={() => navigate("/celebrate")}
      />
    </f.Container>
  );
};

export default index;
