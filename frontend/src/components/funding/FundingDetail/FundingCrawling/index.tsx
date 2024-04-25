import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

// export const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const MiddleWrap = styled.div``;

export const GoalAmount = styled.div`
  width: 100%;
  height: 12px;
  background-color: #f2f4f6;
  border-radius: 6px;
`;

export const CurrentAmount = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 12px;
  background-color: ${colors.mainPink};
  border-radius: 6px;
`;

export const BottomWrap = styled.div`
  display: flex;
  justify-self: flex-end;
  align-content: flex-end;
  font-size: 1em;
  color: ${colors.black};
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;

export const PinkText = styled.div`
  font-size: 1em;
  color: ${colors.mainPink};
`;

export const BlackText = styled.div`
  font-size: 1em;
  color: ${colors.black};
`;

export const Img = styled.img`
  width: 50%;
  height: 50%;
  background-color: #fff;
  border-radius: 20%;
`;


const index = () => {
  return (
    <Container>
      <PinkText>
        {"작성자"}님의 {"04월 10일"} ㅊㅋ
      </PinkText>
      <Title>이벤트 타이틀</Title>
      <Img src={"img/img_present_funding.png"} />
      <TopWrap>
          목표까지<PinkText>{125000}</PinkText>원 남았어요
        <PinkText>{"D-20"}</PinkText>
      </TopWrap>
      <GoalAmount>
        <CurrentAmount $percent={70}></CurrentAmount>
      </GoalAmount>
      <BottomWrap>
      {480000}
      </BottomWrap>
    </Container>
  );
};

export default index;
