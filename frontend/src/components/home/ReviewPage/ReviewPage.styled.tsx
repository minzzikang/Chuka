import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const LargeBtn = styled.button`
  width: 80%;
  height: 49px;
  margin-top: 30px;
  background-color: ${colors.mainPink};
  color: #ffff;
`;