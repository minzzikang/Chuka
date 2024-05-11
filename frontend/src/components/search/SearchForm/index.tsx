import { Dispatch, SetStateAction } from "react";
import * as s from "./SearchForm.styled";
import { KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSearch: (value: string, e: React.KeyboardEvent) => void;
  // resetKeyword: () => void;
}

const index = (props: SearchBarProps) => {
  const { value, setValue, onSearch} = props;

  const onKeyDown = (e: KeyboardEvent<Element>) => onSearch(value, e);

  return (
    <>
      <s.Container>
        <s.Input
          type="text"
          placeholder="찾고 싶은 ㅊㅋ를 입력하세요."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
        />
      </s.Container>
    </>
  );
};

export default index;
