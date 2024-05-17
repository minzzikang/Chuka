 import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/login/LoginPage";
import HomePage from "@pages/home/HomePage";
import CelebrationPage from "@pages/celebration/CelebrationPage";
import NotificationPage from "@/pages/notification/NotificationPage";
import MyPage from "@pages/mypage/MyPage";
import FundingRegPage from "@pages/celebration/funding/FundingLinkPage";
import FundingRegInfoPage from "@pages/celebration/funding/FundingInfoPage";
import PaymentPage from "@pages/celebration/funding/PaymentPage";
import RollingMainPage from "@pages/celebration/rolling/RollingMainPage";
import PaymentDone from "@components/payment/PaymentDone";
import ReviewPage from "@components/home/ReviewPage";
import FundingDetailPage from "@pages/celebration/funding/FundingDetailPage";
import RollingWritePage from "@pages/celebration/rolling/RollingWritePage";
import LoginRedirectHandler from "@/pages/redirect/LoginRedirectHandler";
import PaymentRedirectHandler from "@/pages/redirect/PaymentRedirectHandler";
import MyCelebratePage from "@/pages/mypage/MyCelebratePage/MyCelebratePage";
import MyFundingPage from "@/pages/mypage/MyFundingPage/MyFundingPage";
import EventListPage from "@/pages/eventList/EventListPage";

const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eventlist" element={<EventListPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/oauth2" element={<LoginRedirectHandler />} />

      <Route path="/celebrate" element={<CelebrationPage />} />
      <Route
        path="/celebrate/rolling/:eventId/:pageUri"
        element={<RollingMainPage />}
      />
      <Route
        path="/celebrate/rolling/:eventId/:pageUri/write"
        element={<RollingWritePage />}
      />

      <Route path="/celebrate/rolling/:eventId/fundings" element={<FundingRegPage />} />
      <Route path="/celebrate/rolling/:eventId/funding-info" element={<FundingRegInfoPage />} />
      <Route path="/celebrate/funding/:fundingId" element={<FundingDetailPage />} />
      <Route path="/celebrate/funding/:fundingId/payment" element={<PaymentPage />} />
      <Route path="/celebrate/funding/:fundingId/payment/done" element={<PaymentDone />} />
      <Route path="/celebrate/funding/:fundingId/payment/doing" element={<PaymentRedirectHandler />} />

      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/celebrate" element={<MyCelebratePage />} />
      <Route path="/mypage/funding" element={<MyFundingPage />} />

    </Routes>
  );
};

export default HomeRouter;
