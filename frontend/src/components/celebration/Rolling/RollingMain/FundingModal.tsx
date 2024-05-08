import { colors } from "@/styles/theme";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const PinkBtn = styled.button`
  width: 140px;
  height: 36px;
  background-color: ${colors.mainPink};
  color: white;
  margin-bottom: 10px;
`;

const WhiteBtn = styled.button`
  width: 140px;
  height: 36px;
  background-color: white;
  border: 1px solid ${colors.mainPink};
  color: ${colors.mainPink};
  margin-bottom: 10px;
`

const FundingModal = (props: {setFundingModalOpen:Dispatch<SetStateAction<boolean>>}) => {
  const {setFundingModalOpen} = props
  
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
    <Container>
      <Wrap>
        <div>선물 펀딩 확인을 위해서는 로그인이 필요합니다.</div>
        <BtnWrap>
          <WhiteBtn onClick={() => setFundingModalOpen(false)}> 취소 </WhiteBtn>
          <PinkBtn onClick={goFundingPage}> 로그인 하기 </PinkBtn>
        </BtnWrap>
      </Wrap>
    </Container>
  );
};

export default FundingModal;
