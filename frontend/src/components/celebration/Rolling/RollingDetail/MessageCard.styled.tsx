import styled from "styled-components";
import { colors } from "@/styles/theme";


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
  padding: 15px;
  width: 95%;
  height: 300px;
  font-size: 1em;
  position: relative;
`;

export const Nickname = styled.p`
  position: absolute;
  bottom: 13px;
`;