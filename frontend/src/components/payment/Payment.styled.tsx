import styled from "styled-components";
import { colors } from "@/styles/theme";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Button = styled.button`
  width: 100%;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
`;