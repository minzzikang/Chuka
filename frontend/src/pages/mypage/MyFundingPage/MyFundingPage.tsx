import Header from "@common/header";
import Navbar from "@common/navbar";
import FundingNull from "@/components/mypage/MyFundingNull";
import MyFunding from "@/components/mypage/MyFunding";
import { useEffect, useState } from "react";
import { fetchMyFundings } from "@/apis/funding";
import { FundingDataType } from "@/types/fundingType";

const MyFundingPage = () => {
  const [values, setValues] = useState<FundingDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyFundings();
        setValues(response);
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
        position:'relative',
      }}
    >
      <Header>{"나의 펀딩"}</Header>
      {!values ? (
        <p>데이터를 불러오는 데 실패했습니다.</p>
      ) : values.length > 0 ? (
        <MyFunding />
      ) : (
        <FundingNull />
      )}
      <Navbar current="mypage" />
    </div>
  );
};

export default MyFundingPage;
