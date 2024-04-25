import styled from "styled-components";
import { colors } from "@styles/theme";

export const ThemeWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.5em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 60px;
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

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const P = styled.p`
  color: ${colors.gray};
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
`;

export const ImgPreview = styled.img`
  display: block;
  margin: 0 auto;
  padding: 10px;
  max-width: 100%;
  max-height: 100vh;
  width: 30%;
  height: auto;
`;

export const ThemeButton = styled.button<{ $active: boolean }>`
  background-color: ${colors.white};
  border: 2px solid
    ${(props) => (props.$active ? colors.mainPink : colors.gray)};
  color: ${(props) => (props.$active ? colors.mainPink : colors.gray)};
  border-radius: 0.7em;
  font-size: 0.9em;
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ThemeImg = styled.img`
  width: 90%;
  height: 70%;
  border-radius: 1em;
  margin-bottom: 2px;
`;
