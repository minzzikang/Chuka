import styled from "styled-components";
import { colors, sizes } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
`;

export const Img = styled.img`
  width: 15%;
  height: auto;
`;

export const IconWrap = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 0;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;

export const Span = styled.span`
  color: ${colors.mainPink};
  font-weight: 500;
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;
