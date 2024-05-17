import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 10px auto;
  height: 40px;
  position: sticky;
  border: 2px solid ${colors.inputGray};
  border-radius: 1em;
  padding-right: 5px;
  position: relative;

  img {
    position: absolute;
    top: 5px;
    right: 15px;
  }
`;

export const Input = styled.input`
  width: 90%;
  height: 40px;
  border: none;
  padding: 11px 20px;
  border-radius: 20px;
  background-color: transparent;
`;
