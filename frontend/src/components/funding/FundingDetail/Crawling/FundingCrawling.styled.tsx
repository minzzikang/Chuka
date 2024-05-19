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
  margin-top: 10px;
`;

export const MiddleWrap = styled.div``;

export const GoalAmount = styled.div<{ $remain: number }>`
  width: 100%;
  height: 12px;
  background-color: ${(props) =>
    props.$remain <= 0 ? colors.mainPink : '#f2f4f6'};
  border-radius: 6px;
`;

export const CurrentAmount = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 12px;
  background-color: ${(props) =>
    props.$percent >= 100 ? colors.mainPink : colors.mainPink};
  border-radius: 6px;
  transition: width 0.3s ease-in-out;
`;

export const BottomWrap = styled.div`
  margin-left: auto;
  font-size: 1em;
  color: ${colors.black};
`;

export const Title = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  margin: 20px;
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

export const LinkDiv = styled.div`
  color: ${colors.gray};
  font-size: 1em;
`;
