import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${colors.inputGray};
  border-radius: 10px;
`;
export const Profile = styled.img`
  width: 45px;
  height: 45px;
  margin: 10px;
`;

export const RightWrap = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Text = styled.div`
  font-size: 1em;
`;

export const Highlight = styled(Text)`
  font-size: 1.1em;
  color: ${colors.mainPink};
`;

export const Medal = styled.img`
  display: flex;
  margin-bottom: 10%;
  margin-right: 5px;
  margin-left: auto;
  width: 18px;
  height: auto;
`;
