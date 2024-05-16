import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const Desc = styled.div`
  font-size: 0.8em;
  white-space: pre-line;
`;

export const IntroWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const EventWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SmallBtn = styled.button`
  background-color: ${colors.mainPink};
  color: #ffff;
  font-size: 0.8em;
  width: 80px;
  height: 25px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding-left: 10px;
  font-size: 0.9em;
`;

export const PhoneInput = styled.input`
  width: 100%;
  height: 39px;
  border: none;
  padding-left: 10px;
  font-size: 0.8em;
`;

export const Label = styled.label`
  margin-top: 15px;
  font-size: 0.9em;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 5px;
`;

export const Text = styled.div`
  color: ${colors.gray};
  font-size: 0.8em;
`;