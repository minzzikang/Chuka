import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button<{ $active: boolean }>`
background-color: ${(props) => (props.$active ? colors.white : colors.mainPink)};
border: 2px solid ${colors.mainPink};
color: ${(props) => (props.$active ? colors.mainPink: colors.white )};
border-radius: 0.7em;
font-size: 0.9em;
width: 100px;
height: 36px;
display: flex;
justify-content: center;
align-items: center;
`;

export const Wrap = styled.div`
    display: flex;
    margin-top: 0.3em;
    margin-bottom: 0.5em;
`

export const Input = styled.input`
  width: 339px;
  height: 36px;
  border: 2px solid ${colors.inputGray};
  font-size: 0.9em;
  padding-left: 8px;

  &:focus {
    border-color: ${colors.mainPink};
  }
`

export const P = styled.p`
  color: ${colors.gray};
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
`;