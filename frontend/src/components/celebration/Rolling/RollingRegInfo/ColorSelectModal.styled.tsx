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
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.white};
  width: 100%;
  height: auto;
  bottom: 60px;
  z-index: 200;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
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
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 500;
`;

export const ModalName = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 1em;
  font-weight: 600;
`;
