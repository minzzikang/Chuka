import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div<{ $theme: string }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  background-image: ${(props) =>
    props.$theme === "CORK_BOARD"
      ? `url("/img/img_rolling_theme_cork.jpg")`
      : `url("/img/img_rolling_theme_board.jpg")`};
  background-repeat: repeat-y;
  background-size: cover;
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

export const CardWrap = styled.div`
  position: absolute;
  width: 100%;
  display: grid;
  align-content: start;
  row-gap: 30px;
  column-gap: 5px;
  grid-template-columns: calc(50%) calc(50%);
  padding: 10px;
  padding-bottom: 120px;
  min-height: 100vh;

  & > div:nth-child(3n) {
    transform: rotate(-4deg);
  }

  & > div:nth-child(5n) {
    transform: rotate(10deg);
  }

  & > div:nth-child(even):not(:nth-child(3n)):not(:nth-child(5n)) {
    transform: rotate(7deg);
  }

  & > div:nth-child(odd):not(:nth-child(3n)):not(:nth-child(5n)) {
    transform: rotate(-12deg);
  }
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

export const SMComment = styled.p<{ $active: boolean }>`
  filter: ${(props) => (props.$active ? "none" : `blur(3px)`)};
`;

export const LGComment = styled.p<{ $active: boolean }>`
  filter: ${(props) => (props.$active ? "none" : `blur(5px)`)};
  margin: 5px;
`;

export const DeleteBtn = styled.button`
  position: absolute;
  bottom: 0;
  font-size: 1em;
  color: white;
  width: 100%;
  height: 60px;
  background-color: ${colors.mainPink};
`;

export const Target = styled.div`

  position: absolute;
  height: 1px;
  bottom: 0;
  font-size: 1em;
  color: transparent;
  
`


export const Card = styled.div<{
  $bgColor?: string;
  $font?: string;
  $fontColor?: string;
  $bgImage?: string;
  $shape?: string;
}>`
  display: flex;
  padding: 10px;
  width: 150px;
  height: 150px;
  margin: 10px;
  z-index: 200;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$fontColor || colors.black};
  font-family: ${(props) => props.$font || "Pretendard"};
  font-size: 1.1em;
  font: 700;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) =>
    props.$bgImage ? "transparent" : props.$bgColor || colors.white};
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: ${(props) => (props.$shape === "CIRCLE" ? "50%" : "1em")};

  img {
    width: 30px;
    height: 30px;
  }
`;


export const DetailWrap = styled.div<{
  $bgImage?: string;
  $bgColor?: string;
  $shape: string;
}>`
  background-color: ${(props) =>
    props.$bgImage ? "transparent" : props.$bgColor || colors.white};
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  width: 95%;
  height: 95%;
  border-radius: ${(props) => (props.$shape === "CIRCLE" ? "50%" : "1em")};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CardDetail = styled.div<{
  $font: string;
  $fontColor: string;
  $shape: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;
  height: 90%;
  margin: 10px;
  z-index: 250;
  font-size: 1.5em;
  color: ${(props) => props.$fontColor || colors.black};
  font-family: ${(props) => props.$font || "Pretendard"};
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: ${(props) => (props.$shape === "CIRCLE" ? "50%" : "1em")};
`;
