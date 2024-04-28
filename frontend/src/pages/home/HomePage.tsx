import Button from "@/common/button";
import styled from "styled-components";
import Input from "@common/input"
import { useState } from "react";
import Label from "@common/label"

import LoginPage from "../login/LoginPage";
import RModal from "@common/responsiveModal"
import Navbar from "@common/navbar"

import RadioButton from "@/common/radioButton";
import { MdCake } from "react-icons/md";
import HomeIntro from '@components/home/HomeIntro'
import HomeEventReg from '@components/home/HomeReg'
import HomeEventList from '@components/home/HomeEventList'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  /* justify-content: center; */
  align-items: center;
  width: 90%;
  height: 100vh;
`;



const HomePage = () => {

  return (
    <Container>
    <HomeIntro/>
    <HomeEventReg />
    <br />
    <HomeEventList />

    <Navbar current={"home"}/>
    </Container>
  );
};

export default HomePage;
