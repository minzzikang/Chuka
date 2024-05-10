import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  margin-left: auto;
  font-size: 1em;
  color: ${colors.black};
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;

export const Text = styled.span`
  font-size: 1em;
  color: ${colors.black};
`;

export const HighLight = styled(Text)`
  font-size: 1.1em;
  color: ${colors.mainPink};
`;

export const Img = styled.img`
  width: 50%;
  height: 50%;
  background-color: #fff;
  border-radius: 20%;
`;
