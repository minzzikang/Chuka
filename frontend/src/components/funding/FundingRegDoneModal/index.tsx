import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import presentOpen from "assets/lottie/presentOpen.json";
import * as F from "./FundingRegDoneModal.styled"

const index = () => {
  const navigate = useNavigate();
  const eventUrl = sessionStorage.getItem('prevUrl')


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: presentOpen,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const goEvent = () => {
    if (eventUrl) {
      const url = new URL(eventUrl)
      navigate(url.pathname)
    }
  }

  return (
    <F.Container>
      <Lottie options={defaultOptions} width={150} height={150} />
      <F.P>펀딩이 등록되었습니다.</F.P>
      <F.P>목표까지 추카가 함께 할게요!</F.P>
      <F.Button
        onClick={goEvent}
      >
        확인
      </F.Button>
    </F.Container>
  );
};

export default index;
