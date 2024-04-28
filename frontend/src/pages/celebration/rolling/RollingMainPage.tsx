import Navbar from "@common/navbar";
import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import styled from "styled-components";
import { colors, sizes } from "@styles/theme";
import Theme from "/img/img_rolling_theme_cork.jpg";
import { useState } from "react";
import Drawer from "@components/drawer";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";


type ButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 24vh;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  position: absolute;
  bottom: 5em;
  right: ${(props) => (props.isOpen ? "200px" : "0")};
  transition: right 0.3s ease-in-out;
  writing-mode: vertical-lr;
  z-index: 1000;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
  position: relative;
`;

export const P = styled.p`
  position: absolute;
  font-size: 20px;
  color: ${colors.black};
  text-shadow:
    -1px 0px ${colors.white},
    0px 1px ${colors.white},
    1px 0px ${colors.white},
    0px -1px ${colors.white};
  transform: translate(40%, 0);
  top: 25%;
  z-index: 10;
`;

export const Paper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

export const Message = styled.div`
  position: absolute;
`;

export const RollingTheme = styled.img`
  width: 100%;
  height: auto;
  min-height: 77vh;
  opacity: 0.7;
  position: relative;
`;

const RollingMainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };


  return (
    <>
      <Container>
        <RollingHeader />
        <Banner />
        <Paper>
          <P>롤링페이퍼를 작성해주세요.</P>
          <RollingTheme src={Theme} alt="theme"></RollingTheme>
          <Button onClick={toggleDrawer} isOpen={isDrawerOpen}>
            선물펀딩확인하기
          </Button>
        </Paper>
      </Container>
      <Navbar current="celebration" />
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default RollingMainPage;
