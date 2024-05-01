import { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

type InputType = {
  width?: string;
  height?: string;
  type?: string;
  value: string;
  id: string;
  placeholder: string;
  onInputChange?: (value: string) => void;
  onEnterKeyUp?: (value: string) => void;
};

const Input = styled.input`
  width: ${(props) => (props.width ? props.width : "339px")};
  height: ${(props) => (props.height ? props.height : "36px")};
  border: 2px solid ${colors.gray};
  font-size: 0.9em;
  padding-left: 8px;
`;

const index = (props: InputType) => {
  const {
    width,
    height,
    type,
    value,
    id,
    placeholder,
    onInputChange,
    onEnterKeyUp,
  } = props;

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };

  const handleEnterKeyUp = (e: KeyboardEvent<Element>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (onEnterKeyUp) {
        onEnterKeyUp(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <>
      <Input
        width={width}
        height={height}
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyUp={handleEnterKeyUp}
      />
    </>
  );
};

export default index;
