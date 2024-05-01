import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  padding: 10px;
`;

export const Card = styled.div<{ isSelected: boolean; color: string }>`
  width: 60px;
  height: 60px;
  background-color: ${({ color }) => color};
  margin: 5px;
  border-radius: 1em;
  box-shadow: 1px 0.5px 0 0 gray;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${colors.mainPink}` : "none"};
  cursor: pointer;
`;
