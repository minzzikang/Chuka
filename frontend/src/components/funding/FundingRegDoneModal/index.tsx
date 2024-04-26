import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import presentOpen from "assets/lottie/presentOpen.json";
import * as F from "./FundingRegDoneModal.styled"

const index = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: presentOpen,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <F.Container>
      <Lottie options={defaultOptions} width={150} height={150} />
      <F.P>펀딩 등록이 신청되었습니다.</F.P>
      <F.P>등록이 완료되면 알림으로 안내드립니다.</F.P>
      <F.Button
        onClick={() => {
          navigate("/");
        }}
      >
        확인
      </F.Button>
    </F.Container>
  );
};

export default index;
