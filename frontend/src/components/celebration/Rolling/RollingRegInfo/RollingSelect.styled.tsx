import styled from "styled-components";
import { colors } from "@styles/theme";
import { IoIosArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${colors.black};
    font-weight: 700;
    flex-grow: 1;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: ${colors.black};
    font-weight: 700;
    font-size: 14px;
    margin-right: 10px;
  }
`;

export const Icon = styled(IoIosArrowBack)`
  position: fixed;
  left: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
`;

export const ShapeButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  padding: 5px;
  border: 2px solid;
  border-color: ${({ isActive }) =>
    isActive ? colors.mainPink : colors.inputGray};
  color: ${({ isActive }) => (isActive ? colors.mainPink : colors.gray)};
  background-color: ${colors.white};
`;

export const Img = styled.img`
  width: 60%;
  height: auto;
  margin-bottom: 5px;
`;

export const BackgroundButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  border: 2px solid;
  border-color: ${({ isActive }) =>
    isActive ? colors.mainPink : colors.inputGray};
  color: ${({ isActive }) => (isActive ? colors.mainPink : colors.gray)};
  background-color: ${colors.white};
`;

export const ImagePreview = styled.img`
  display: block;
  margin: 0 auto;
  padding: 10px;
  max-width: 100%;
  max-height: 100vh;
  width: 40%;
  height: auto;
`;
