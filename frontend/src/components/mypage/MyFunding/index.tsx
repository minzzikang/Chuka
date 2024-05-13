import * as f from "./MyFunding.styled";
import FundingItem from "@components/mypage/MyFunding/FundingItem";
import { useEffect, useState } from "react";
import { fetchMyFundings, deleteFunding } from "@/apis/funding";

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
        setFundings(MyFundings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (fundingId: number) => {
    try {
      await deleteFunding(fundingId);
      const updatedValues = fundings.filter(
        (item) => item.fundingId !== fundingId
      );
      setFundings(updatedValues);
      alert("펀딩이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div>
      <f.Container>
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
            handleDelete={handleDelete}
          />
        ))}
      </f.Container>
    </div>
  );
};

export default idex;
