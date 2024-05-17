import { useEffect, useState } from "react";
import * as h from "./HomePage.styled";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeBanner from "@components/home/HomeBanner";
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

  const images = [
    '/img/img_main_banner.png',
    '/img/img_main_banner2.png',
    '/img/img_main_banner3.png',
    '/img/img_main_banner4.png',
    '/img/img_main_banner5.png',
    '/img/img_main_banner6.PNG',
  ]

  return (
    <>
      <h.Wrap>
        <HomeHeader />
        <HomeIntro eventCnt={eventCount.eventCnt} msgCnt={eventCount.msgCnt} />
        <HomeEventReg />
        <HomeEventList />
        <HomeReview />
        <HomeBanner images={images}/>
      </h.Wrap>
      <Navbar current={"home"} />
    </>
  );
};

export default HomePage;
