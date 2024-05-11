import { colors } from "@/styles/theme";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteFunding } from "@/apis/funding";

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

interface FundingDeleteModalProps {
  fundingId: number
  setFundingModalOpen:Dispatch<SetStateAction<boolean>>
}

const FundingDeleteModal = (props:FundingDeleteModalProps) => {
  const { fundingId, setFundingModalOpen} = props
  
  const navigate = useNavigate();
  const eventUrl = sessionStorage.getItem('prevUrl')

  const onDeleteFunding = async () => {
    try {
      const response = await deleteFunding(fundingId)
      alert('해당 펀딩 상품이 삭제되었습니다.')
      if (eventUrl) {
        const url = new URL(eventUrl)
        navigate(url.pathname)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Wrap>
        <div>정말로 펀딩 상품을 삭제하시겠습니까?</div>
        <BtnWrap>
          <WhiteBtn onClick={() => setFundingModalOpen(false)}> 취소 </WhiteBtn>
          <PinkBtn onClick={onDeleteFunding}> 삭제 </PinkBtn>
        </BtnWrap>
      </Wrap>
    </Container>
  );
};

export default FundingDeleteModal;
