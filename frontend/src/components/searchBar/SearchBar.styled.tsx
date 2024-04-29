import { colors } from "@/styles/theme";
import styled from "styled-components";


export const Container = styled.div`
  width: 90%;
  height: 36px;
  border-radius: 2em;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: auto;
  border: none;
  margin-left: 10px;
`;