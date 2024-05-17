import { colors } from "@styles/theme";
import styled from "styled-components";

export const Input = styled.input`
  width: 339px;
  height: 36px;
  border-radius: 0.6em;
  border: 2px solid ${colors.inputGray};
  background-color: ${colors.white};
  color: ${colors.black};
  font-size: 0.9em;
`;
