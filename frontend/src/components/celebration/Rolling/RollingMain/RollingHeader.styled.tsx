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
  margin-left: 10px;
`;

export const IconWrap = styled.div`
  display: flex;
`;

export const Span = styled.span`
  margin-left: 3px;
  font-weight: 500;
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  color: ${colors.mainPink};
`;
