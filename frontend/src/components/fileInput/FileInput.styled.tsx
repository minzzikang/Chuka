import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FileInputContainer = styled.div`
  width: 339px;
  height: 36px;
  border: 2px solid ${colors.inputGray};
  background-color: ${colors.white};
  color: ${colors.gray};
  border-radius: 0.6em;
  font-size: 0.9em;
  padding-left: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ImagePreview = styled.img`
  display: block;
  margin: 0 auto;
  padding: 10px;
  max-width: 100%;
  max-height: 100vh;
  width: 30%;
  height: auto;
`;