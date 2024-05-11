import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  height: 25%;
  background-color: ${colors.white};
  z-index: 10;
  position: absolute;
  width: 100%;
`;

export const Xbutton = styled.div`
  display: flex;
  align-self: flex-end;
  padding: 5px;

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 50;
`;
