import { useEffect } from "react";
import { fetchUserInfo } from "@/apis/auth";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import styled from "styled-components";
import Navbar from "@common/navbar";
import HomeHeader from "@components/home/HomeHeader/";
import HomeIntro from "@components/home/HomeIntro";
import HomeEventReg from "@components/home/HomeReg";
import HomeEventList from "@components/home/HomeEventList";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100vh;
`;

const HomePage = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    fetchUserInfo()
      .then((data) => {
        setUser({ ...user, ...data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);





  return (
    <Container>
    <HomeHeader />
    <HomeIntro />
    <HomeEventReg />
    <br />
    <HomeEventList />

    <Navbar current={"home"} />
  </Container>
  );
};

export default HomePage;
