import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

interface LabelProps {
  checked: boolean;
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
  $color?: string;
  $borderRadius?: string;
}

interface RadioButtonProps extends LabelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}


const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width || "100px"};
  height: ${(props) => props.$height || "40px"};

  background-color: ${(props) => props.$backgroundColor || colors.white};
  color: ${(props) => props.$color || colors.gray};
  
  font-size: 1em;
  border-radius: ${(props) => props.$borderRadius || "1em"};
  border: 2px solid
    ${(props) => (props.checked ? colors.mainPink : colors.gray)};
  cursor: pointer;
`;

const index = (props: RadioButtonProps) => {
  const {
    $width,
    $height,
    children,
    onChange,
    value,
    checked,
    $backgroundColor,
    $color,
    $borderRadius,
  } = props;

  return (
    <>
      <input
        id={value}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Label
        htmlFor={value}
        $width={$width}
        $height={$height}
        $backgroundColor={$backgroundColor}
        $color={$color}
        $borderRadius={$borderRadius}
        checked={checked}
      >
        {children}
      </Label>
    </>
  );
};

export default index;
