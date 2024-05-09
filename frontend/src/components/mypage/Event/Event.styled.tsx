import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
  position: relative;
`;

export const Label = styled.p`
  font-weight: 500;
  position: absolute;
  top: 0;
  left: 10px;
`;

export const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
