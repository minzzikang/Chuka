import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Drawer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  max-width: 300px;
  height: calc(100vh - 62px);
  padding: 15px;
  background-color: ${colors.white};
  color: ${colors.black};
  position: absolute;
  bottom: 0;
  right: 0;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  z-index: 1000;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  display: flex;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  width: 100px;
  height: 35px;
  border-radius: 0.7em;
  margin-top: 20px;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 2.8em;
  cursor: pointer;
`;

export const Card = styled.div`
  margin-top: 10px;
  background-color: ${colors.white};
  border-radius: 1em;
  border: 2px solid ${colors.inputGray};
  cursor: pointer;
`;

export const Img = styled.img`
  width: 130px;
  height: auto;
`;
