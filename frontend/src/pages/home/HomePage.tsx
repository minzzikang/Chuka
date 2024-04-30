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
    <h.Container>
      <HomeHeader />
      <HomeIntro />
      <HomeEventReg />
      <br />
      <HomeEventList />
      <Navbar current={"home"} />
    </h.Container>
  );
};

export default HomePage;
