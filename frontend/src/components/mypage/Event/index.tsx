import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import * as e from "./Event.styled";
import SearchBar from "@/components/searchBar";
import RegEventList from "./RegSection/RegEventList";

const index = () => {
  const navigate = useNavigate();

  return (
    <>
      <e.Container>
        <SearchBar />
        <e.Wrap>
          <e.Label>내가 등록한 ㅊㅋ</e.Label>
          <RegEventList />
        </e.Wrap>
        <e.Wrap>
          <e.Label>내가 참여한 ㅊㅋ</e.Label>
          <RegEventList />
        </e.Wrap>
      </e.Container>
    </>
  );
};

export default index;
