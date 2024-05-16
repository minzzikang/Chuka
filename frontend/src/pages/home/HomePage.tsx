import { useEffect, useState } from "react";
import * as h from "./HomePage.styled";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeReview from "@components/home/HomeReview";
import { fetchCount } from "@/apis/event";

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
