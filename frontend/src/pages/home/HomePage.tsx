import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/stores/user";
import * as h from "./HomePage.styled";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeReview from "@components/home/HomeReview";

const HomePage = () => {
  const user = useRecoilValue(userState);
  console.log("user", user);

  return (
    <>
      <h.Wrap>
        <HomeHeader />
        <HomeIntro />
        <HomeEventReg />
        <HomeEventList />
        <HomeReview />
      </h.Wrap>
      <img
        src="/img/img_main_banner.png"
        alt=""
        style={{ width: "100%", position: "fixed", bottom: "60px" }}
      />
      <Navbar current={"home"} />
    </>
  );
};

export default HomePage;
