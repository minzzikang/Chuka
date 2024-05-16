import styled from "styled-components";
import { colors } from "@styles/theme";

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  row-gap: 0.5em;
  column-gap: 1em;
  margin-top: 0.3em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 30px;
`;

export const Button = styled.button<{ $active: boolean }>`
  background-color: ${colors.white};
  border: 2px solid
    ${(props) => (props.$active ? colors.mainPink : colors.inputGray)};
  color: ${(props) => (props.$active ? colors.mainPink : colors.gray)};
  border-radius: 0.7em;
  font-size: 0.9em;
  width: 100px;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;

  & > span {
    flex-grow: 1;
    text-align: center;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;