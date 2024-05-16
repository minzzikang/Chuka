import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95px;
  border-bottom: 2px solid #fff;
  cursor: pointer;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: ${colors.white};
`;

export const LeftWrap = styled.div`
  display: flex;
  gap: 10px;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const Comment = styled.div`
  font-size: 14px;
`;

export const Title = styled.div`
  font-size: 10px;
`;

export const Date = styled.div`
  font-size: 10px;
  color: ${colors.gray};
`;

export const Delete = styled.img`
  width: 18px;
  height: 18px;
`;
