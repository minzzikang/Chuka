import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: 600;
`;

export const Label = styled.label`
  font-size: 1em;
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 0.9em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 0.9em;
`;
