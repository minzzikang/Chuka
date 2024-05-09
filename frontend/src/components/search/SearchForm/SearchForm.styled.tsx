import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  height: 70px;
  position: sticky;

  img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 90%;
  height: 40px;
  border: none;
  padding: 11px 20px;
  border-radius: 20px;
  background-color: ${colors.white};
`;

export const Xbutton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;
