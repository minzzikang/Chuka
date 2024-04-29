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
  margin-bottom: 2.5em;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 49px;
  background-color: ${colors.yelloKakao};
  color: ${colors.black};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);

  img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;
