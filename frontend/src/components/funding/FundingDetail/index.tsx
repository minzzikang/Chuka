import FundingHeaderSection from "./Header";
import FundingCrawlingSection from "./Crawling";
import FundingMessageSection from "./Message";
import * as f from "./FundingDetail.styled";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFunding } from "@/apis/funding";
import { useEffect, useState } from "react";
import { calculatePercent } from "@/utils/calculation";

type FundingType = {
  fundingId: number;
  eventDate: string;
  eventTitle: string;
  status: string;
  productImage: string;
  goalAmount: number;
  remainAmount: number;
  introduce: string;
  sponsors: [];
  dday: number;
};

const index = () => {
  const navigate = useNavigate();
  const params = useParams()
  const fundingId = Number(params.fundingId)



  const onPayment = () => {
    console.log("선물 펀딩 참여하기");
    console.log(fundingId);
    navigate("/celebrate/payment");
  };

  const [values, setValues] = useState<FundingType>(
    
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunding(fundingId);
        console.log("디테일 페이지 함수 호출!!!!!", response);
        setValues(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [fundingId]);



  return (
    <f.Container>
      {/* eventId header에 넣어주기 -> 카카오 공유하기 */}
      <FundingHeaderSection  />
      <FundingCrawlingSection
        percent={values ? calculatePercent(values.goalAmount, values.remainAmount) : 0}
        image={values?.productImage ?? "/img/img_present_funding.png"}
        title={values?.eventTitle ?? "데이터를 불러올 수 없습니다."}
        date={values?.eventDate ?? "0000-00-00"}
        goalAmount={values?.goalAmount ?? 0}
        remainAmount={values?.remainAmount ?? 0}
        dDay={values?.dday ?? 0}
      />
      <FundingMessageSection
        introduce={values?.introduce ?? "펀딩을 소개하는 문구입니다."}
        sponsor={values?.sponsors ?? []}
      />
      <f.Button onClick={onPayment}>선물 펀딩 참여하기</f.Button>
    </f.Container>
  );
};

export default index;
