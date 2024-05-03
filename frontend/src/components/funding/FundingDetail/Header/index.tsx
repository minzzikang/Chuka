import { useEffect } from "react";
import * as H from "./FundingHeader.styled";
import { ShareKakao } from "@/services/kakaoShare";

const index = () => {
  

  return (
    <H.Container>
      <H.Logo src="/img/img_logo.png" />
      <H.Text onClick={ShareKakao}>공유하기</H.Text>
    </H.Container>
  );
};

export default index;
