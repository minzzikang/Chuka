import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 90%;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const PinkBtn = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${colors.mainPink};
  font-size: 1.2em;
  margin-bottom: 20px;
`;

export const WhiteBtn = styled.button`
  width: 100%;
  height: 60px;
  color: ${colors.mainPink};
  background-color: white;
  font-size: 1.2em;
`;

export const BtnWrap = styled.div`
  display: flex;
  gap: 15px;
`;
