import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 60px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
