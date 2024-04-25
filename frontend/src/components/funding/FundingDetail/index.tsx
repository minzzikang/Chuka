import React from "react";
import styled from "styled-components";
import FundingHeaderSection from "./FundingHeader";
import FundingCrawlingSection from "./FundingCrawling"
import FundingMessageSection from "./FundingMessage"

const Container = styled.div`
  width: 90%;
  margin: auto auto;
`;

const Wrap = styled.div`

`;

const index = () => {

  const currentAmount = '70'

  return (
    <Container>
      <FundingHeaderSection />
      <FundingCrawlingSection />
      <FundingMessageSection />
    </Container>
  );
};

export default index;
