import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div<{ $isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  opacity: ${(props) => (props.$isLoading ? "0.4" : "none")};
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  width: 339px;
  height: 36px;
  padding-left: 10px;
`;

export const SmallInput = styled.input`
  width: 100px;
  height: 36px;
  padding-left: 10px;
`;

export const Label = styled.label``;

export const SmallBtn = styled.button`
  width: 97px;
  height: 36px;
  background-color: ${colors.mainPink};
  color: white;
  font-size: 12px;
`;

export const LargeBtn = styled.button`
  width: 339px;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
`;

export const Img = styled.img`
  width: 155px;
  height: 155px;
`;
