import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const P = styled.p`
  font-size: 14px;
`;

export const Button = styled.button`
  width: 339px;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
`;