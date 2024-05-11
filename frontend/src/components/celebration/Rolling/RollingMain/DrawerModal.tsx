import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import * as d from "./DrawerModal.styled";
import { useEffect, useState } from "react";
import { fetchFundings } from "@/apis/funding";
import FundingCard from "@common/fundingCard";

export type fundingData = {
    fundingId:number
    productImage:string
    productName:string
    introduce: string
    startDate:string
    endDate:string
    fundingResult:string
}

const DrawerModal = () => {
  const navigate = useNavigate();
  const { eventId, pageUri } = useParams<{
    eventId: string;
    pageUri: string;
  }>();
  const [fundingData, setFundingData] = useState<fundingData[]>([]);

  useEffect(() => {
    const fetchFunding = async () => {
      if (typeof eventId == "string") {
        try {
          const fundingInfo = await fetchFundings(eventId);

          console.log("펀딩 목록 조회 후후후후", fundingInfo);
          setFundingData(fundingInfo);
        } catch (err) {
          console.error(err);
          throw err;
        }
      } else {
        console.error("eventId 이상");
      }
    };
    fetchFunding();
  }, [eventId]);

  return (
    <d.Container>
      <br />
      <p onClick={() => console.log(fundingData)}>진행 중인 펀딩이 없습니다.</p>

      {fundingData &&
        fundingData.map((funding, index) => (
          <FundingCard
            key={index}
            fundingId={funding.fundingId}
            productImgUrl={funding.productImage}
            productName={funding.productName}
            introduce={funding.introduce}
            startDate={funding.startDate}
            endDate={funding.endDate}
            fundingResult={funding.fundingResult}
          />
        ))}
      <d.Button
        onClick={() => navigate(`/celebrate/rolling/${eventId}/fundings`)}
      >
        <IoMdAdd /> &nbsp; 펀딩 추가
      </d.Button>
    </d.Container>
  );
};

export default DrawerModal;
