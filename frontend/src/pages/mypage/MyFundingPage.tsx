import Header from "@common/header";
import Navbar from "@common/navbar";
import FundingNull from "@/components/mypage/MyFundingNull";
import MyFunding from "@/components/mypage/MyFunding/idex";

const MyFundingPage = () => {
  return (
    <div>
      <Header children="나의 펀딩" />
      <MyFunding />
      <FundingNull />
      <Navbar current="mypage" />
    </div>
  );
};

export default MyFundingPage;
