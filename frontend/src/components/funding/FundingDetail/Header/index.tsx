import * as H from "./FundingHeader.styled";
import { shareFundingKakao } from "@/services/shareFundingKakao";
import { colors } from "@/styles/theme";
import { LuScrollText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export type FundingHeaderType = {
  fundingUrl: string
  productUrl: string | undefined
  productName: string | undefined
  nickname: string
};




const index = (props: FundingHeaderType) => {
  const navigate = useNavigate()
  const {fundingUrl, productUrl, productName, nickname} = props
  const eventUrl = sessionStorage.getItem('prevUrl')
  const handleBack = () => {
    window.history.back();
  };

  const goEvent = () => {
    if (eventUrl) {
      const url = new URL(eventUrl)
      navigate(url.pathname)
    } else {
      navigate('/')
    }
  }

  return (
    <H.Container>
      <H.IconArrow onClick={handleBack} />
      <div style={{ display:'flex', gap:'45px'}}>
      <H.IconWrap
        onClick={() =>
          shareFundingKakao({ fundingUrl, productUrl, productName, nickname })
        }
      >
        <H.Icon src="/icon/icon_share.png" alt="" />
        <H.Text>공유하기</H.Text>
      </H.IconWrap>
      <H.IconWrap
        onClick={goEvent}
      >
        <H.customIcon>  
        <LuScrollText color={colors.mainPink} size={22}/>
        </H.customIcon>
        <H.Text>추카 보기</H.Text>
      </H.IconWrap>

      </div>
    </H.Container>
  );
};

export default index;
