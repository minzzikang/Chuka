import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import * as f from "./FundingModal.styled";

const FundingModal = (props: {
  setFundingModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setFundingModalOpen } = props;

  const navigate = useNavigate();
  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem("access_token");
  const parsedUrl = new URL(prevUrl);
  const path = parsedUrl.pathname;

  const goFundingPage = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(`${path}`);
    }
  };

  return (
    <f.Container>
      <f.Wrap>
        <div>선물 펀딩 확인을 위해서는 로그인이 필요합니다.</div>
        <f.BtnWrap>
          <f.WhiteBtn onClick={() => setFundingModalOpen(false)}>
            {" "}
            취소{" "}
          </f.WhiteBtn>
          <f.PinkBtn onClick={goFundingPage}> 로그인 하기 </f.PinkBtn>
        </f.BtnWrap>
      </f.Wrap>
    </f.Container>
  );
};

export default FundingModal;
