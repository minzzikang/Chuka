import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 0px; */

`

const Title = styled.div`
  font-size: 1.8em;
  color: ${colors.mainPink};
  font-weight: 700;
`;

const Desc = styled.div`
  font-size: 1em;
  white-space: pre-line;
`;

const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;


const index = () => {
  return (
    <>
      <Title>소중한 후기를 작성해주세요 !</Title>
      <DescWrap>
        <Desc>후기를 작성해주신 분들께</Desc>
        <Desc>추첨을 통해 스타벅스 기프티콘을 드립니다.</Desc>
      </DescWrap>
    </>
  );
};

export default index;
