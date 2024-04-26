import styled from "styled-components";
import { colors, sizes } from "@/styles/theme";

export const BlackBox = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 150;
  width: 100%;
  height: 100dvh;
  background-color: #000;
  opacity: 0.3;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  border-radius: 1em;
  background-color: ${colors.white};
  width: 100%;
  height: auto;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
`;

export const P = styled.p`
  font-size: 14px;
`;

export const Button = styled.button`
  width: 339px;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
  margin-bottom: 20px;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  img {
    cursor: pointer;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 500;
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 500;
`;

export const ModalName = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 1em;
  font-weight: 600;
`;
