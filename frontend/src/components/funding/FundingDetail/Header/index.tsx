import { RollingHeaderType } from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import * as H from "./FundingHeader.styled";
import { shareFundingKakao } from "@/services/shareFundingKakao";

const index = (props: RollingHeaderType, eventUrl: string) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <H.Container>
      <H.IconArrow onClick={handleBack} />
      <H.IconWrap
        // onClick={() =>
        //   shareFundingKakao({ eventUrl, bannerThumbnailUrl, title, nickname })
        // }
      >
        <H.Icon src="/icon/icon_share.png" alt="" />
        <H.Text>공유하기</H.Text>
      </H.IconWrap>
    </H.Container>
  );
};

export default index;
