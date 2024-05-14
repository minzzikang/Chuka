import styled from "styled-components";
import Lottie from "react-lottie";
import presentOpen from "assets/lottie/presentOpen.json";
import { colors } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const P = styled.p`
  font-size: 14px;
`;

const Button = styled.button`
  width: 339px;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
`;

const PresentOpen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: presentOpen,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      <Lottie options={defaultOptions} width={150} height={150} />
      <P>펀딩이 등록되었습니다.</P>
      <P>목표까지 추카가 함께 할게요!</P>
      <Button>확인</Button>
    </Container>
  );
};

export default PresentOpen;
