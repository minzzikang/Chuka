import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

export type PayBoxType = {
  cash: number;
  isActive: boolean;
  imgSrc: string;
  width: string;
  height: string;
  comment: string;
  onClick: () => void;
};

export const Container = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-radius: 6px;
  border: 2px solid
    ${(props) => (props.$active ? colors.mainPink : colors.inputGray)};
  color: ${colors.inputGray};
  display: flex;
  padding-left: 10px;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  position: relative;
`;

export const PayBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
position: absolute;
left: 23%;
`;

export const Cost = styled.div`
  font-size: 1.1em;
  color: ${colors.mainPink};
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: 0.9em;
  font-weight: 500;
`;

const PayBox = (props: PayBoxType) => {
  const { cash, isActive, imgSrc, width, height, comment, onClick } = props;

  return (
    <Container $active={isActive} onClick={onClick}>
      <img
        src={imgSrc}
        alt=""
        style={{ width: `${width}`, height: `${height}` }}
      />
      <PayBoxWrap>
        <Cost>{cash.toLocaleString()}원</Cost>
        <Text>
          {comment}
        </Text>
      </PayBoxWrap>

    </Container>
  );
};

export default PayBox;
