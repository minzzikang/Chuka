import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import * as d from "./Drawer.styled";
import Test from "/img/img_main_paper.png"

type DrawerType = {
  isOpen: boolean;
  onClose: () => void;
};


const Index: React.FC<DrawerType> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <d.Container>
      <d.Drawer isOpen={isOpen}>
        <d.Title>
          펀딩 리스트
          <d.Icon
            src={"/icon/icon_close_black.png"}
            alt="close"
            onClick={onClose}
          />
        </d.Title>
        <br />
        <p>진행 중인 펀딩이 없습니다.</p>
        <d.Card onClick={() => navigate("/celebrate/payment")}>
        <d.Img src={Test}/>
        </d.Card>
        <d.Button onClick={() => navigate("/celebrate/funding")}>
          <IoMdAdd />
          펀딩 추가
        </d.Button>
      </d.Drawer>
      <d.Overlay isOpen={isOpen} onClick={onClose} />
    </d.Container>
  );
};

export default Index;
