import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";
import Lottie from "react-lottie";
import animationData from "@assets/lottie/chuka.json";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroWrap = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/img/img_chuka_intro.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: 800;
`;
const SubTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 1em;
`;
const Highlight = styled(Text)`
  color: ${colors.mainPink};
`;

const InfoWrap = styled.div`
  width: 300px;
  height: 300px;
`;

const ChukaInfoWrap = styled.div`
  width: 100%;
  height: 100px;
  background-image: url("/img/img_chuka_info.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  gap: 5px;
`;

const AnimationWrap = styled.div`
  position: relative;
  margin-top: 10px;
`;

const Promotion = styled.img`
  position: absolute;
  bottom: 0px;
  right: 60px;
`;

const TextWrap = styled.div`
margin-right: 20px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const index = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleUrlCopy = async () => {
    try {
      await navigator.clipboard.writeText("chuka.kr");
      alert("클립보드에 링크가 복사되었어요.");
      console.log("카카오 공유하기");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <IntroWrap>
        <Title>
          우리들의 &nbsp;<Highlight>추</Highlight>억의 &nbsp;
          <Highlight>카</Highlight>드
        </Title>
        <SubTitle>소중한 사람들과 마음을 나눠요</SubTitle>
        <br />
        <Text>추카는 특별한 날, 친구들과 함께 축하 메시지를 공유하고</Text>
        <Text>원하는 선물을 펀딩하여 배송해드리는 서비스입니다.</Text>
        <AnimationWrap>
          <div onClick={handleUrlCopy}>
            <Lottie
              options={defaultOptions}
              width={62.15}
              height={75}
              speed={0.1}
            />
          </div>
          <Promotion src="/img/img_promotion.png" />
        </AnimationWrap>
      </IntroWrap>
      <InfoWrap>
        <ChukaInfoWrap>
          <TextWrap>
            <Text>누적 축하 이벤트</Text>
            <Text>{512}개</Text>
          </TextWrap>
          <TextWrap>
            <Text>누적 축하 메시지</Text>
            <Text>{6812}개</Text>
          </TextWrap>
        </ChukaInfoWrap>
      </InfoWrap>
    </Container>
  );
};

export default index;
