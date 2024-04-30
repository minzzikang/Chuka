import Button from "@/common/button";
import styled from "styled-components";
import Input from "@common/input";
import { useState } from "react";
import Label from "@common/label";

import LoginPage from "../login/LoginPage";
import RModal from "@common/responsiveModal";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeReview from "@components/home/HomeReview"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100vh;
  gap: 50px;
`;

const HomePage = () => {
  return (
    <Container>
    <Wrap>
      <HomeHeader />
      <HomeIntro />
      <HomeEventReg />
      <HomeEventList />
      <HomeReview />
      {/* <div style={{marginTop:'1000px'}}></div> */}
    </Wrap>
    <div>
      {/* <img src="/img/img_main_banner.png" alt="" style={{width:'100%', position:"absolute"}} /> */}
      <Navbar current={"home"}/>
    </div>
    </Container>
  );
};

export default HomePage;
