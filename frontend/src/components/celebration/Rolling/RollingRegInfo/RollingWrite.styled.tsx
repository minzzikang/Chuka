import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MessageBox = styled.textarea<{ font: string }>`
  background-color: ${colors.white};
  margin: 20px;
  border-radius: 1em;
  padding: 10px;
  width: 95%;
  height: 300px;
  border: none;
  font-size: 1em;
  font-family: ${(props) => props.font}, Pretendard;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

export const ColorButton = styled.div<{ color: string; isSelected: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 3px solid
    ${(props) => (props.isSelected ? colors.mainPink : colors.white)};
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export const PretendButton = styled.button<{ isSelected: boolean }>`
  font-family: Pretendard;
  width: 95px;
  height: 37px;
  border-radius: 0.5em;
  border: 2px solid ${colors.mainPink};
  background-color: ${(props) =>
    props.isSelected ? colors.mainPink : colors.white};
  color: ${(props) => (props.isSelected ? colors.white : colors.mainPink)};
`;

export const GoocneaeumButton = styled.button<{ isSelected: boolean }>`
  font-family: Goocneaeum;
  width: 95px;
  height: 37px;
  border-radius: 0.5em;
  border: 2px solid ${colors.mainPink};
  background-color: ${(props) =>
    props.isSelected ? colors.mainPink : colors.white};
  color: ${(props) => (props.isSelected ? colors.white : colors.mainPink)};
`;

export const TreegardenButton = styled.button<{ isSelected: boolean }>`
  font-family: Treegarden;
  width: 95px;
  height: 37px;
  border-radius: 0.5em;
  border: 2px solid ${colors.mainPink};
  background-color: ${(props) =>
    props.isSelected ? colors.mainPink : colors.white};
  color: ${(props) => (props.isSelected ? colors.white : colors.mainPink)};
`;