import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/login/LoginPage";
import HomePage from "@pages/home/HomePage";
import CelebrationPage from "@/pages/celebration/CelebrationPage";
import AlarmPage from "@/pages/alarm/AlarmPage";
import MyPage from "@/pages/mypage/MyPage";
import FundingRegPage from "@/pages/celebration/funding/FundingLinkPage";
import FundingRegInfoPage from "@/pages/celebration/funding/FundingInfoPage";
import PaymentPage from "@/pages/celebration/funding/PaymentPage";
import RollingMainPage from "@/pages/celebration/rolling/RollingMainPage";
import RollingBackgroundPage from "@/pages/celebration/rolling/RollingBackgroundPage";
import PaymentDone from "@components/payment/PaymentDone"
import FundingDetailPage from "@/pages/celebration/funding/FundingDetailPage";

const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/celebrate" element={<CelebrationPage />} />
      <Route path="/celebrate/rolling" element={<RollingMainPage />} />
      <Route path="/celebrate/rolling-background" element={<RollingBackgroundPage />} />
      <Route path="/celebrate/funding" element={<FundingRegPage/>} />
      <Route path="/celebrate/funding-info" element={<FundingRegInfoPage/>} />
      <Route path="/celebrate/payment" element={<PaymentPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/mypage" element={<MyPage />} />


      

      <Route path="/detail" element={<FundingDetailPage/>}/>
      <Route path="/done" element={<PaymentDone />} />
    </Routes>
  );
};

export default HomeRouter;
