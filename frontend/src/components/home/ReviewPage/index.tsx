import { colors } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";
import TopSection from "@components/home/ReviewPage/TopSection";
import MiddleSection from "@components/home/ReviewPage/MiddleSection";
import Header from '@common/header'
import { createReview } from "@/apis/review";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LargeBtn = styled.button`
  width: 80%;
  height: 49px;
  margin-top: 30px;
  background-color: ${colors.mainPink};
  color: #ffff;
`;

const index = () => {
  const [regData, setRegData] = useState<{ content: string; phoneNumber: string }>({
    content: "",
    phoneNumber: "",
  });

  const navigate = useNavigate()

  const onRegister = async () => {
    try {
      const response = createReview(regData)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <Container>
      <Header children={"후기 작성"} />
      <div style={{marginTop:'50px'}}></div>
      <TopSection />
      <MiddleSection
        comment={regData.content}
        setComment={(value) =>
          setRegData((prev) => ({ ...prev, content: value }))
        }
        phone={regData.phoneNumber}
        setPhone={(value) => setRegData((prev) => ({ ...prev, phoneNumber: value }))}
      />
      <LargeBtn onClick={onRegister}>등록하기</LargeBtn>
    </Container>
  );
};

export default index;
