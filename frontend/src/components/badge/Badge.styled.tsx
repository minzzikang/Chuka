import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div<{ $result: string }>`
  background-color: ${(props) =>
    props.$result === "ONGOING" ? colors.mainPink : colors.gray};
  width: 40px;
  height: 15px;
  color: ${colors.white};
  border-radius: 1em;
  margin-bottom: 1em;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
`;
