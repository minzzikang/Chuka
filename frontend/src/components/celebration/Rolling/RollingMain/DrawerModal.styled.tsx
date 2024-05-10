import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  display: flex;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  width: 120px;
  height: 40px;
  border-radius: 0.7em;
  font-size: 1.1em;
  margin-top: 20px;
`;

export const Card = styled.div`
  margin-top: 10px;
  background-color: ${colors.white};
  border-radius: 1em;
  border: 2px solid ${colors.inputGray};
  cursor: pointer;
  width: 150px;
  height: 150px;
`;

