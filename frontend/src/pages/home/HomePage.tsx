import { useEffect } from "react";
import { fetchUserInfo } from "@/apis/auth";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import * as h from "./HomePage.styled";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";
import HomeReview from "@components/home/HomeReview"
import styled from "styled-components";

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
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    fetchUserInfo()
      .then((data: any) => {
        console.log(user);
        console.log(data);
        setUser({ ...user, ...data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
    <Wrap>
      <HomeHeader />
      <div style={{marginTop:'50px'}}></div>
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
