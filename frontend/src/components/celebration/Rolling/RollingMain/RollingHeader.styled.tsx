import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Img = styled.img`
  width: 15%;
  height: auto;
`;

export const IconWrap = styled.div`
  display: flex;
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
