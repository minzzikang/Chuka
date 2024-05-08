import { useRecoilValue } from "recoil";
import * as f from "./MyFunding.styled";
import SearchBar from "@/components/searchBar";
import FundingItem from "@components/mypage/MyFunding/FundingItem";
import { useEffect, useState } from "react";
import { fetchMyFundings } from "@/apis/funding";

interface MyFundingProps {
  fundingId: number;
  introduce: string;
  fundingResult: string;
  productImage: string;
  startDate: string;
  endDate: string;
}

const idex = () => {
  const [fundings, setFundings] = useState<MyFundingProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const MyFundings = await fetchMyFundings();
        console.log("내 펀딩들", MyFundings);
        setFundings(MyFundings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <f.Container>
        <SearchBar />
        <f.Wrap>
          <f.Label>내가 등록한 펀딩</f.Label>
        </f.Wrap>
        {fundings.map((funding) => (
          <FundingItem
            key={funding.fundingId}
            fundingId={funding.fundingId}
            introduce={funding.introduce}
            fundingResult={funding.fundingResult}
            productImage={funding.productImage}
            startDate={funding.startDate}
            endDate={funding.endDate}
          />
        ))}
      </f.Container>
    </div>
  );
};

export default idex;
