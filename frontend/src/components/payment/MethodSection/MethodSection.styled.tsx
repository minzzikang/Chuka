import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;
export const Title = styled.div`

font-size: 1.5em;
font-weight: 600;

`;

export const Button = styled.button<{ $active: boolean }>`
  width: 81px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid
    ${(props) => (props.$active ? colors.mainPink : colors.gray)};
`;

export const Img = styled.img<{ $active: boolean }>`
  width: 20%;
  height: 20%;
  border: 2px solid
    ${(props) => (props.$active ? colors.mainPink : colors.gray)};
  border-radius: 35px;
`;