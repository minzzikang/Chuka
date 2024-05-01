import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

type ButtonType = {
  $width?: string;
  $height?: string;
  children: React.ReactNode;
  $backgroundColor?: string;
  $color?: string;
  imgSrc?: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button = styled.button<ButtonType>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.$width ? props.$width : "339px")};
  height: ${(props) => (props.$height ? props.$height : "49px")};
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : `${colors.mainPink}`};
  color: ${(props) => (props.color ? props.color : "#fff")};

  font-size: 1em;
  border-radius: 1em;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
`;

const index = (props: ButtonType) => {
  const {
    $width,
    $height,
    children,
    disabled,
    onClick,
    $backgroundColor,
    $color,
    imgSrc,
  } = props;

  return (
    <Button
      $width={$width}
      $height={$height}
      $backgroundColor={$backgroundColor}
      $color={$color}
      disabled={disabled}
      onClick={onClick}
    >
      {imgSrc ? <Icon src={imgSrc} /> : undefined}
      {children}
    </Button>
  );
};

export default index;
