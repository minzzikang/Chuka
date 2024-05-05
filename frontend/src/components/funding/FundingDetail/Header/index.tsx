import * as H from "./FundingHeader.styled";
import { ShareKakao } from "@/services/kakaoShare";


const index = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <H.Container>
      <H.Icon onClick={handleBack} />
      <H.Text onClick={ShareKakao}>공유하기</H.Text>
    </H.Container>
  );
};

export default index;
