import styled from "styled-components";
import { colors } from "@/styles/theme";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
`;

export const Label = styled.label``;

export const Input = styled.input`
  width: 339px;
  height: 36px;
  padding-left: 10px;
`;

export const Button = styled.button`
  width: 339px;
  height: 36px;
  background-color: ${colors.mainPink};
  color: white;
`;

export const Text = styled.p`
  color: ${colors.mainPink};
	font-size: 1em;
	font-weight: 700;
`;