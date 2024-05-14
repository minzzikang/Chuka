import { useEffect, useState } from "react";

import * as h from "./HomePage.styled";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeReview from "@components/home/HomeReview";
import { fetchCount } from "@/apis/event";
import { handleAllowNotification } from "@/services/notificationPermission";

const HomePage = () => {
  const [eventCount, setEventCount] = useState({
    eventCnt: 0 || null,
    msgCnt: 0 || null,
  });

  useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const response = await fetchCount();
        setEventCount(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventCount();
  }, []);

  // useEffect(() => {
  //   const notificationTimeout = setTimeout(() => {
  //     handleAllowNotification();
  //   }, 3000); // 3초 후에 실행

  //   return () => clearTimeout(notificationTimeout);
  // }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <>
      <h.Wrap>
        <HomeHeader />
        <HomeIntro eventCnt={eventCount.eventCnt} msgCnt={eventCount.msgCnt} />
        <HomeEventReg />
        <HomeEventList />
        <HomeReview />
        <h.Img src="/img/img_main_banner.png" alt="" />
      </h.Wrap>
      <Navbar current={"home"} />
    </>
  );
};

export default HomePage;
