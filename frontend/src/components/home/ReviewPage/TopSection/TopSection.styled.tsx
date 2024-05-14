import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Title = styled.div`
  font-size: 1.8em;
  color: ${colors.mainPink};
  font-weight: 700;
`;

export const Desc = styled.div`
  font-size: 1em;
  white-space: pre-line;
`;

export const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;
