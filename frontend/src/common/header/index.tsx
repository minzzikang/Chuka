import * as h from "@common/header/Header.styled";
import { ReactNode } from "react";

type HeaderType = {
  children: string;
  onClick?: () => void;
  label?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
};

const index = ({ children, icon, onIconClick }: HeaderType) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <h.Wrapper>
      <h.Icon onClick={handleBack} />
      {icon && <h.Icon2 onClick={onIconClick}>{icon}</h.Icon2>}
      <h.Header>{children}</h.Header>
    </h.Wrapper>
  );
};

export default index;
