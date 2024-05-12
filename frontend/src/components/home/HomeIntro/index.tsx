import * as h from '@components/home/HomeIntro/HomeIntro.styled'
import Lottie from "react-lottie";
import animationData from "@assets/lottie/chuka.json";
import { useEffect } from 'react';
import useCountNum from '@/utils/useCountUp';
import { handleUrlCopy } from '@/utils/useCountUp';


type HomeIntroType = {
  eventCnt:number | null
  msgCnt:number | null
}

const index = (props: HomeIntroType) => {
  const {eventCnt, msgCnt} = props

  const copyEventCnt = Number(eventCnt)
  const copyMsgCnt = Number(msgCnt)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  useEffect

  return (
    <h.Container>
      <h.IntroWrap>
        <h.Title>
          우리들의 &nbsp;<h.Highlight>추</h.Highlight>억의 &nbsp;
          <h.Highlight>카</h.Highlight>드
        </h.Title>
        <h.SubTitle>소중한 사람들과 마음을 나눠요</h.SubTitle>
        <br />
        <h.Text>추카는 특별한 날, 친구들과 함께 축하 메시지를 공유하고</h.Text>
        <h.Text>원하는 선물을 펀딩하여 배송해드리는 서비스입니다.</h.Text>
        <h.AnimationWrap>
          <div onClick={() => handleUrlCopy("chuka.kr")}>
            <Lottie
              options={defaultOptions}
              width={62.15}
              height={75}
              speed={0.5}
            />
          </div>
          <h.Promotion src="/img/img_promotion.png" />
        </h.AnimationWrap>
      </h.IntroWrap>
      <h.InfoWrap>
        <h.ChukaInfoWrap>
          <h.TextWrap>
            <h.Text>누적 축하 이벤트</h.Text>
            <h.Text>{useCountNum(copyEventCnt,0,1000)} 개</h.Text>
          </h.TextWrap>
          <h.TextWrap>
            <h.Text>누적 축하 메시지</h.Text>
            <h.Text>{useCountNum(copyMsgCnt,0,1000)} 개</h.Text>
          </h.TextWrap>
        </h.ChukaInfoWrap>
      </h.InfoWrap>
    </h.Container>
  );
};

export default index;


