import styled from "styled-components";
import { colors } from "@styles/theme";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

export const Text = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 5px;
`;

export const Highlight = styled(Text)`
  color: ${colors.mainPink};
`;

export const FlexRow = styled.div`
  display: flex;
`;