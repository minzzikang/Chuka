import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import * as f from "./MyFunding.styled";
import SearchBar from "@/components/searchBar";
import FundingItem from "@components/mypage/MyFunding/FundingItem";

const idex = () => {
  const navigate = useNavigate();

  return (
    <div>
      <f.Container>
        <SearchBar />
        <f.Wrap>
          <f.Label>내가 등록한 펀딩</f.Label>
        </f.Wrap>
          <FundingItem />
      </f.Container>
    </div>
  );
};

export default idex;
