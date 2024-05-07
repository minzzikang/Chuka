import Header from "@common/header";
import Navbar from "@common/navbar";
import FundingNull from "@/components/mypage/MyFundingNull";
import MyFunding from "@/components/mypage/MyFunding/idex";
import { useEffect, useState } from "react";
import { fetchMyFundings } from "@/apis/funding";

interface MyFundingProps {
  fundingId: number;
  introduce: string;
  fundingResult: string;
  productImage?: string;
  startDate: string;
  endDate: string;
}

const MyFundingPage = () => {
  const [values, setValues] = useState<MyFundingProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyFundings();
        setValues(response);
        console.log("펀딩정보", values);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header children="나의 펀딩" />
      {values.length > 0 ? <MyFunding /> : <FundingNull />}
      <Navbar current="mypage" />
    </div>
  );
};

export default MyFundingPage;
