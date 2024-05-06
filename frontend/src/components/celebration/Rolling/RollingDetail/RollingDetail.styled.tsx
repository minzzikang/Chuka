import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MessageBox = styled.div<{
  $bgColor?: string;
  $bgImage?: string;
  $fontColor?: string;
  $font?: string;
}>`
  background-color: ${(props) =>
    props.$bgImage ? "transparent" : props.$bgColor || "transparent"};
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : "none"};
  color: ${(props) => props.$fontColor || colors.black};
  font-family: ${(props) => props.$font || "Pretendard"};
  margin: 20px;
  border-radius: 1em;
  padding: 15px;
  width: 95%;
  height: 300px;
  font-size: 1em;
  position: relative;
  background-size: cover;
  background-position: center;
`;

export const Nickname = styled.p`
  position: absolute;
  bottom: 13px;
`;
