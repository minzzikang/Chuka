import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  margin: 15px;
`;

export const Label = styled.p`
  margin-left: 20px;
  font-weight: 500;
  position: absolute;
  left: 0;
`;