import styled from "styled-components";
import { colors, sizes } from "@/styles/theme";
import { IoIosArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

export const Header = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${colors.black};
    font-weight: 700;
    flex-grow: 1;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: ${colors.black};
    font-weight: 700;
    font-size: 14px;
    margin-right: 10px;
  }
`;

export const SelectWrap = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
  align-items: center;

  button {
    display: flex;
    border-radius: 0.3em;
    padding: 5px;
    font-size: 0.9em;
    min-width: 100px; // 최소 너비 설정
    white-space: nowrap; // 글자가 줄바꿈되지 않도록 설정

    @media (min-width: 769px) {
      font-size: 0.8em; // 데스크탑에서는 글씨 크기를 줄임
      padding: 10px 5px; // 데스크탑에서는 패딩 조정
    }
  }
`;

export const Label = styled.p`
  align-self: flex-start;
  margin-left: 10px;
  margin-bottom: 3px;
`;

export const Icon = styled(IoIosArrowBack)`
  position: fixed;
  left: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
`;

export const WriterInfo = styled.input`
  height: 2em;
  border: none;
  font-size: 1em;
  padding: 5px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

export const ShapeButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  height: 60px;
  padding: 5px;
  border: 2px solid;
  border-color: ${(props) =>
    props.$isActive ? colors.mainPink : colors.inputGray};
  color: ${(props) => (props.$isActive ? colors.mainPink : colors.gray)};
  background-color: ${colors.white};
`;

export const Img = styled.img`
  width: 30%;
  height: auto;
`;

export const BackgroundButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  border: 2px solid;
  border-color: ${(props) =>
    props.$isActive ? colors.mainPink : colors.inputGray};
  color: ${(props) => (props.$isActive ? colors.mainPink : colors.gray)};
  background-color: ${colors.white};
`;

export const ColorButton = styled.div<{ color: string; $isSelected: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 3px solid
    ${(props) => (props.$isSelected ? colors.mainPink : colors.white)};
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export const PretendButton = styled.button<{ $isSelected: boolean }>`
  font-family: "Pretendard";
  width: 95px;
  height: 37px;
  border-radius: 0.5em;
  margin-right: 15px;
  border: 2px solid
    ${(props) => (props.$isSelected ? colors.mainPink : colors.inputGray)};
  background-color: ${colors.white};
  color: ${(props) => (props.$isSelected ? colors.mainPink : colors.gray)};
`;

export const GoocneaeumButton = styled.button<{ $isSelected: boolean }>`
  font-family: "Goocneaeum";
  width: 95px;
  height: 37px;
  margin-right: 15px;
  border-radius: 0.5em;
  border: 2px solid
    ${(props) => (props.$isSelected ? colors.mainPink : colors.inputGray)};
  background-color: ${colors.white};
  color: ${(props) => (props.$isSelected ? colors.mainPink : colors.gray)};
`;

export const TreegardenButton = styled.button<{ $isSelected: boolean }>`
  font-family: "Treegarden" !important;
  width: 95px;
  height: 37px;
  border-radius: 0.5em;
  border: 2px solid
    ${(props) => (props.$isSelected ? colors.mainPink : colors.inputGray)};
  background-color: ${colors.white};
  color: ${(props) => (props.$isSelected ? colors.mainPink : colors.gray)};
  margin-right: 15px;
`;

export const Button = styled.button`
  background-color: ${colors.mainPink};
  color: ${colors.white};
  width: 95%;
  height: 50px;
  border-radius: 1em;
  border: none;
`;

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

  button {
    width: 100px;
    height: 40px;
    border-radius: 0.7em;
    background-color: ${colors.white};
    border: 2px solid ${colors.mainPink};
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const P = styled.p`
  margin: 10px;
`;

export const MessageBox = styled.textarea<{
  $font: string;
  $backColor: string;
  $shape: string;
  $backImage?: string;
  $type: string;
}>`
  background-color: ${(props) =>
    props.$type === "img" ? "transparent" : props.$backColor};
  background-image: ${(props) =>
    props.$backImage ? `url(${props.$backImage})` : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 10px;
  border-radius: 1em;
  padding: ${(props) => (props.$shape === "CIRCLE" ? "50% 0px" : "10px")};
  width: 95%;
  height: 380px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  resize: none;
  border: none;
  border-radius: ${(props) => (props.$shape === "CIRCLE" ? "50%" : "1em")};
  font-size: 1.5em;
  font-family: ${(props) => (props.$font ? props.$font : "Pretendard")};
`;
