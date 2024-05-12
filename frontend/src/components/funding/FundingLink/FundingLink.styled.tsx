import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const Carousel = styled.div`
  display: flex;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 40px;
`;

export const Label = styled.label`
  font-size: 0.9em;
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  width: 339px;
  height: 60px;
  padding-left: 10px;
  resize: none;
`;

export const Button = styled.button`
  width: 339px;
  height: 36px;
  background-color: ${colors.mainPink};
  color: white;
`;

export const Text = styled.p`
  font-size: 1em;
`;

export const CautionWrap = styled.div``;
