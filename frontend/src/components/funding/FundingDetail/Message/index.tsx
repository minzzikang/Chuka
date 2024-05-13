import MessageList from "./MessageList";
import * as F from "./FundingMessage.styled";
import { colors } from "@/styles/theme";

interface Sponsor {
  sponsorId: number;
  amount: number;
  comment: string;
  nickname: string;
  profileImage: string;
}

interface FundingProps {
  introduce: string;
  sponsor: Sponsor[];
}

const index = (props: FundingProps) => {
  const { introduce, sponsor } = props;



  return (
    <F.Container>
      {/* <F.Wrap> */}
        {/* <F.Text>펀딩 상품 링크</F.Text> */}
        {/* <div style={{backgroundColor:`${colors.mainPink}`, color:'white', height: '36px', paddingLeft:'10px', display:'flex', alignItems:"center"}} onClick={goProductUrl}>구매 링크 바로가기</div> */}
      {/* </F.Wrap> */}
      <F.Wrap>
        <F.Text>펀딩 소개</F.Text>
        <F.Intro>{introduce}</F.Intro>
      </F.Wrap>
      <MessageList sponsors={sponsor} />
    </F.Container>
  );
};

export default index;
