import { colors } from "@/styles/theme";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  padding-left: 10px;
`;

export const IconArrow = styled(IoIosArrowBack)`
  position: absolute;
  left: 0;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
  margin-left: 5px;

`;

export const IconWrap = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 60px;
  top: 10px;
`;

export const customIcon = styled.div`
  position: absolute;
  right: 61px;
  top: 10px;

  img {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }
`;

export const Text = styled.div`
  color: ${colors.mainPink};
  font-size: 1em;
  margin-top: 12.5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
