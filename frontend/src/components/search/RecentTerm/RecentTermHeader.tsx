import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-block: 10px 20px;
`;

export const Title = styled.div`
  font-weight: 600;
`;

export const Button = styled.button`
  color: ${colors.inputGray};
  font-size: 0.9em;
`;

const RecentTermHeader = (props: { resetTerms: () => void }) => {
  const { resetTerms } = props;

  return (
    <Container>
      <Title>최근 검색어</Title>
      <Button onClick={resetTerms}>지우기</Button>
    </Container>
  );
};

export default RecentTermHeader;
