import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 90%;
  margin: auto auto;
`;

export const Button = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${colors.mainPink};
  font-size: 1.2em;
  margin-top: 30px;
`;