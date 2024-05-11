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
    <div
      style={{
        paddingBottom: "80px", // 네비게이션 바 높이만큼 패딩 추가
        minHeight: "100vh", // 화면의 전체 높이를 채우도록 설정
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header children="나의 펀딩" />
      {values.length > 0 ? <MyFunding /> : <FundingNull />}
      <Navbar current="mypage" />
    </div>
  );
};

export default MyFundingPage;
