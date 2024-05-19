import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? colors.mainPink : colors.white};
  border: 2px solid ${(props) => (props.$active ? "none" : colors.inputGray)};
  color: ${(props) => (props.$active ? colors.white : colors.gray)};
  border-radius: 0.7em;
  font-size: 0.9em;
  width: 100px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.3em;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  width: 339px;
  height: 36px;
  border: 2px solid ${colors.inputGray};
  font-size: 0.9em;
  padding-left: 8px;

  &:focus {
    border-color: ${colors.mainPink};
  }
`;

export const FileInputContainer = styled.div`
  width: 339px;
  height: 36px;
  display: flex;
  color: ${colors.gray};
  border: 2px solid ${colors.inputGray};
  border-radius: 0.7em;
  font-size: 0.9em;
  padding-left: 8px;
  padding-right: 12px;
  align-items: center;
  background-color: ${colors.white};
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  color: ${colors.mainPink};
  margin-bottom: 5px;
`;

export const ImagePreview = styled.img`
  padding: 10px;
  max-width: 70%;
  max-height: 180px;
  width: auto;
  height: auto;
`;

export const P = styled.p`
  color: ${colors.gray};
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
`;


export const BtnWrap = styled.div`
  display: flex;
  margin-bottom: 3px;
`;

export const ThemeButton = styled.button<{
  $active: boolean;
}>`
  background-color: ${colors.white};
  border: 2px solid
    ${(props) => (props.$active ? colors.mainPink : colors.inputGray)};
  color: ${(props) => (props.$active ? colors.mainPink : colors.gray)};
  border-radius: 0.7em;
  font-size: 0.9em;
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  align-items: center;
`;

export const ThemeImg = styled.img`
  width: 90%;
  height: 70%;
  border-radius: 1em;
  margin-bottom: 2px;
`;
