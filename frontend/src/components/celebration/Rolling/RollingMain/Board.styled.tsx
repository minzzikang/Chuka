import styled from "styled-components";
import { colors } from "@styles/theme";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  width: 30px;
  height: 24vh;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  position: absolute;
  bottom: 5em;
  right: 0;
  transition: right 0.3s ease-in-out;
  writing-mode: vertical-lr;
`;

export const P = styled.p`
  position: absolute;
  font-size: 20px;
  color: ${colors.black};
  text-shadow:
    -1px 0px ${colors.white},
    0px 1px ${colors.white},
    1px 0px ${colors.white},
    0px -1px ${colors.white};
  transform: translate(40%, 0);
  top: 10%;
  z-index: 10;
`;

export const Container = styled.div`
  position: relative;
  flex-grow: 1;
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

export const RollingTheme = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 77vh;
  opacity: 0.7;
  position: relative;
  min-height: 100vh;
  background-image: url(${props => props.src});
  background-repeat: repeat-y;
  background-size: cover;
`;

export const CardWrap = styled.div`
  position: absolute;
  width: 100%;
  display: grid;
  align-content: start;
  row-gap: 30px;
  column-gap: 5px;
  grid-template-columns: calc(50%) calc(50%);
  padding: 10px;
  min-height: 100vh;
`;

export const Card = styled.div<{
  $bgColor?: string;
  $font: string;
  $fontColor: string;
  $bgImage?: string;
  $shape: string;
}>`
  display: flex;
  width: 150px;
  height: 150px;
  margin: 10px;
  z-index: 200;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$fontColor || colors.black};
  font-family: ${(props) => props.$font || "Pretendard"};
  background-color: ${(props) =>
    props.$bgImage ? "transparent" : props.$bgColor || colors.white};
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: ${(props) => (props.$shape === "CIRCLE" ? "50%" : "1em")};
`;
