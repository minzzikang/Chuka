import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    background-color: ${colors.mainPink};
    width: 100px;
    height: 30px;
    color: ${colors.white};
    font-size: 0.9em;
  }
`;

export const Img = styled.img`
  width: 50%;
  height: auto;
`;

export const Text = styled.div`
  font-size: 1em;
`;

export const Highlight = styled(Text)`
  color: ${colors.mainPink};
  margin-right: 5px;
`;

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
`;
