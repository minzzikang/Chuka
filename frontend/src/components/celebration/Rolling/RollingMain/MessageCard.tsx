import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div<{
  $bgColor?: string;
  $font: string;
  $fontColor?: string;
  $bgImage?: string;
  $shape: string;
}>`
  display: flex;
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

const MessageCard = () => {
  return (
    <Container
    >
      {content}
      {nickname}
    </Container>
  );
};

export default MessageCard;
