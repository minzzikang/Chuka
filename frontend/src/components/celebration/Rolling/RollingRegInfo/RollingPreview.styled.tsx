import styled from "styled-components";
import { colors, sizes } from "@styles/theme";

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

export const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 1em;
  background-color: ${colors.white};
  z-index: 200;
  max-width: ${sizes.maxWidth};
`;

export const P = styled.p`
  margin: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MessageBox = styled.div<{
  bgColor?: string;
  bgImage?: string;
  fontColor?: string;
  fontFamily?: string;
}>`
  background-color: ${({ bgColor }) => bgColor || colors.white};
  background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : "none")};
  color: ${({ fontColor }) => fontColor || colors.black};
  font-family: ${({ fontFamily }) => fontFamily || "Pretendard"};
  margin: 20px;
  border-radius: 1em;
  padding: 10px;
  width: 95%;
  height: 300px;
  font-size: 1em;
`;

export const Button = styled.button`
  background-color: ${colors.mainPink};
  color: ${colors.white};
  width: 95%;
  height: 50px;
  border-radius: 1em;
  border: none;
  margin-top: 20px;
`;

export const WriterInfo = styled.input`
  width: 100%;
  height: 2em;
  border: none;
  font-size: 1em;
  margin-left: 5px;
  padding: 5px;
`;

export const Wrap = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
`;
