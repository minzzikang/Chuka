import * as c from "./ColorSelectModal.styled";
import { ModalType } from "@/types/commonType";
import { useState } from "react";
import ColorCard from "./ColorCard";

const index = ({ name, onClose, onSelectColor }: ModalType) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleCilck = () => {
    if (onSelectColor) {
      onSelectColor(selectedColor);
    }
    onClose();
  };

  return (
    <>
      <c.BlackBox onClick={onClose} />
      <c.Container>
        <c.Wrap>
          <c.ModalName>{name}</c.ModalName>
          <ColorCard onSelectColor={setSelectedColor} />
        </c.Wrap>
        <c.Button onClick={handleCilck}>선택</c.Button>
        <c.Backdrop>
          <img
            src={"/icon/icon_close_black.png"}
            alt="close"
            onClick={onClose}
          />
        </c.Backdrop>
      </c.Container>
    </>
  );
};

export default index;
