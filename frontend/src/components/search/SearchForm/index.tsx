import { Dispatch, SetStateAction, KeyboardEvent } from "react";
import * as s from "./SearchForm.styled";

interface SearchProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSearch: (value: string, e: KeyboardEvent<Element> | null) => void;
}

const index = (props: SearchProps) => {
  const { value, setValue, onSearch } = props;

  const onKeyDown = (e: KeyboardEvent<Element>) => {
    onSearch(value, e);
  };

  const onClick = () => {
    onSearch(value, null);
  };

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
        <img src="/icon/icon_search.png" alt="" onClick={onClick} />
      </s.Container>
    </>
  );
};

export default index;
