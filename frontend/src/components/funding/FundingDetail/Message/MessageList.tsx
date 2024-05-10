import { useState } from "react";
import MessageItem from "./MessageItem";
import * as M from "./MessageList.styled";

interface Sponsor {
  sponsorId: number;
  amount: number;
  comment: string;
  nickname: string;
  profileImage: string;
}

interface MessageListProps {
  sponsors: Sponsor[];
}

const MessageList = (props: MessageListProps) => {
  const { sponsors } = props;
  const [isSeeMore, setIsSeeMore] = useState<boolean>(true);

  const visibleData = isSeeMore ? sponsors.slice(0, 3) : sponsors;

  return (
    <M.Container>
      <M.Wrap>
        <M.Text>친구들이 남긴 ㅊㅋ</M.Text>
        {sponsors &&
          visibleData.map((item, index) => (
            <MessageItem
              key={item.sponsorId}
              sponsorId={item.sponsorId}
              amount={item.amount}
              comment={item.comment}
              nickname={item.nickname}
              profileImage={item.profileImage}
              rank={index + 1}
            />
          ))}
        {isSeeMore ? (
          <M.SeeMoreBtn onClick={() => setIsSeeMore(!isSeeMore)}>
            ㅊㅋ 더보기
          </M.SeeMoreBtn>
        ) : (
          <M.SeeMoreBtn onClick={() => setIsSeeMore(!isSeeMore)}>
            ㅊㅋ 접기
          </M.SeeMoreBtn>
        )}
      </M.Wrap>
    </M.Container>
  );
};

export default MessageList;
