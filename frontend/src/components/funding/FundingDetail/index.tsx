import React from "react";
import FundingHeaderSection from "./Header";
import FundingCrawlingSection from "./Crawling";
import FundingMessageSection from "./Message";
import styled from "styled-components";
import { colors } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  margin: auto auto;
`;

const Wrap = styled.div``;

const Button = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${colors.mainPink};
  font-size: 1.2em;
  margin-top: 30px;
`;

const index = () => {
  const navigate = useNavigate()
  const percent = 70;

  const onPayment = () => {
    console.log('선물 펀딩 참여하기');
    navigate('/celebrate/payment')
  }

  return (
    <Container>
      <FundingHeaderSection />
      <FundingCrawlingSection percent={percent} />
      <FundingMessageSection />
      <Button onClick={onPayment}>선물 펀딩 참여하기</Button>
    </Container>
  );
};

export default index;
