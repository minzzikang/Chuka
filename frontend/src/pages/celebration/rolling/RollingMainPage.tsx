import Navbar from "@common/navbar";
import styled from "styled-components";
import { colors, sizes } from "@styles/theme";
import Logo from "/img/img_logo.png";
import ShareIcon from "/icon/icon_share.png";
import AddIcon from "/icon/icon_add_message.png";
import TestImg from "/img/img_main_banner.png";
import Theme from "/img/img_rolling_theme_cork.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Drawer from "@components/drawer";
import { IoMdSettings } from "react-icons/io";

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

export const Header = styled.div`
  display: flex;
  margin-left: 10px;
  width: 100%;
  position: relative;
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

export const IconWrap = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 0;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;

export const Img = styled.img`
  width: 15%;
  height: auto;
`;

export const Span = styled.span`
  color: ${colors.mainPink};
  font-weight: 500;
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

export const BannerWrap = styled.div`
  position: relative;
`;

export const Title = styled.p`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Name = styled.p`
  position: absolute;
  top: 50px;
  left: 10px;
  font-size: 16px;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Dday = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 26px;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Banner = styled.img`
  opacity: 0.5;
  width: 100%;
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
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleAdd = () => {
    navigate("/celebrate/rolling-select");
  };

  const handleShare = () => {};

  const handleModify = () => {
    navigate("/celebrate")
  };

  return (
    <>
      <Container>
        <Header>
          <Img src={Logo} alt="logo" />
          <IconWrap>
            <BtnWrap onClick={handleShare}>
              <Icon src={ShareIcon} alt="share" />
              <Span>공유하기</Span>
            </BtnWrap>
            <BtnWrap onClick={handleAdd}>
              <Icon src={AddIcon} alt="add" />
              <Span>작성하기</Span>
            </BtnWrap>
          </IconWrap>
        </Header>
        <BannerWrap>
          <Banner src={TestImg} />
          <Title>
            이벤트 제목
            <IoMdSettings onClick={handleModify}/>
          </Title>
          <Name>작성자 이름</Name>
          <Dday>남은 날짜</Dday>
        </BannerWrap>
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
