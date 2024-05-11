import MessageList from "./MessageList";
import * as F from "./FundingMessage.styled";

interface Sponsor {
  sponsorId: number;
  amount: number;
  comment: string;
  nickname: string;
  profileImage: string;
}

interface FundingProps {
  productLink: string;
  introduce: string;
  sponsor: Sponsor[];
}

const index = (props: FundingProps) => {
  const { productLink, introduce, sponsor } = props;

  return (
    <F.Container>
      <F.Wrap>
        <F.Text>펀딩 상품 링크</F.Text>
        <F.Intro>{productLink}</F.Intro>
      </F.Wrap>
      <F.Wrap>
        <F.Text>펀딩 소개</F.Text>
        <F.Intro>{introduce}</F.Intro>
      </F.Wrap>
      <MessageList sponsors={sponsor} />
    </F.Container>
  );
};

export default index;
