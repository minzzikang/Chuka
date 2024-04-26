import * as c from "./ColorSelectModal.styled";
import { ModalType } from "@/types/commonType";
import { useState } from "react";



const index = ({ name, children, onClose, onColorSelect }: ModalType) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleCilck = () => {
    if (onColorSelect) {
      onColorSelect(selectedColor);
    }
  };

  return (
    <>
      <c.BlackBox onClick={onClose} />
      <c.Container>
        <c.Wrap>
          <c.ModalName>{name}</c.ModalName>
          {children}
        </c.Wrap>
        <c.Button onClick={() => onColorSelect && onColorSelect(selectedColor)}>
          선택
        </c.Button>
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
