import * as s from "./SearchBar.styled";
import SearchIcon from "/icon/icon_search.png";


const index = () => {
    const handleClick = () => {

    }
  return (
    <s.Container>
      <s.Input type="text" placeholder="찾고 싶은 ㅊㅋ를 입력하세요." />
      <img
      src={SearchIcon}
      alt="search"
      onClick={handleClick}
      />
    </s.Container>
  );
};

export default index;
