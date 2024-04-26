import styled from "styled-components";
import { colors, sizes } from "@styles/theme";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type DrawerType = {
  isOpen: boolean;
  onClose: () => void;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Drawer = styled.div<{ isOpen: boolean }>`
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

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const Button = styled.button`
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

const Index: React.FC<DrawerType> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/celebrate/funding");
  };

  return (
    <Container>
      <Drawer isOpen={isOpen}>
        <Title>펀딩 리스트</Title>
        <br />
        <p>진행 중인 펀딩이 없습니다.</p>
        <Button onClick={handleClick}>
          <IoMdAdd />
          펀딩 추가
        </Button>
      </Drawer>
      <Overlay isOpen={isOpen} onClick={onClose} />
    </Container>
  );
};

export default Index;
