import FundingHeaderSection from "./Header";
import FundingCrawlingSection from "./Crawling";
import FundingMessageSection from "./Message";
import * as f from "./FundingDetail.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFunding } from "@/apis/funding";
import { useEffect, useState } from "react";

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
  const location = useLocation();
  const fundingId = location.state?.fundingId;

  const onPayment = () => {
    console.log("선물 펀딩 참여하기");
    navigate("/celebrate/payment");
  };

  const [values, setValues] = useState<FundingType>();

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

  const calculateGoal = () => {
    if (!values) return 0;
    const percent =
      ((values.goalAmount - values.remainAmount) / values.goalAmount) * 100;
    return Math.round(percent);
  };

  return (
    <f.Container>
      <FundingHeaderSection />
      <FundingCrawlingSection
        percent={calculateGoal()}
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
