import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 20px;
  width: 90%;
  height: 150px;
  border-radius: 1em;
  background-color: ${colors.white};
  padding: 10px;
  align-items: center;
`;

export const Img = styled.img`
  width: 100px;
  height: 90%;
  border: 2px solid ${colors.inputGray};
  border-radius: 1em;
  margin-left: 5px;
`;

export const Wrap = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1em;
`;

export const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Date = styled.p`
  color: ${colors.gray};
  font-size: 0.8em;
`

export const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export const MoneyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
`;

export const GoalAmount = styled.div`
  width: 100%;
  height: 12px;
  background-color: #f2f4f6;
  border-radius: 6px;
  margin-top: 10px;
`;

export const CurrentAmount = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 12px;
  background-color: ${colors.mainPink};
  border-radius: 6px;
`;

export const Text = styled.span`
  font-size: 1em;
  color: ${colors.black};
`;

export const HighLight = styled(Text)`
  font-size: 1.1em;
  color: ${colors.mainPink};
  margin-right: 5px;
`;
