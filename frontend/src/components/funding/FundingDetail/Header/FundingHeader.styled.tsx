import { colors } from "@/styles/theme";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const IconArrow = styled(IoIosArrowBack)`
  position: fixed;
  left: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
`;

export const IconWrap = styled.div`
  position: relative;
  display: flex;
  gap: 5px;

`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 60px;
  top: 10px;
`

export const Text = styled.div`
  color: ${colors.mainPink};
  font-size: 1em;
  margin-top: 12.5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;