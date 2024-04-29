import styled from "styled-components";
import { colors } from "@styles/theme";

export type ButtonType = {
  isActive: boolean;
};

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

export const ShapeButton = styled.button<ButtonType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 5px;
  border: 2px solid;
  border-color: ${(props) =>
    props.isActive ? colors.mainPink : colors.inputGray};
  color: ${(props) => (props.isActive ? colors.mainPink : colors.gray)};
  background-color: ${colors.white};
`;

export const Img = styled.img`
  width: 60%;
  height: auto;
  margin-bottom: 5px;
`;

export const BackgroundButton = styled.button<ButtonType>`
  display: flex;
  margin-right: 30px;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 60px;
  border: 2px solid;
  border-color: ${(props) =>
    props.isActive ? colors.mainPink : colors.inputGray};
  color: ${(props) => (props.isActive ? colors.mainPink : colors.gray)};
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
