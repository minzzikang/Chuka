import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const BtnWrap = styled.div`
  display: flex;
  gap: 20px;
`;

export const PinkBtn = styled.button`
  width: 140px;
  height: 36px;
  background-color: ${colors.mainPink};
  color: white;
  margin-bottom: 10px;
`;

export const WhiteBtn = styled.button`
  width: 140px;
  height: 36px;
  background-color: white;
  border: 1px solid ${colors.mainPink};
  color: ${colors.mainPink};
  margin-bottom: 10px;
`;
