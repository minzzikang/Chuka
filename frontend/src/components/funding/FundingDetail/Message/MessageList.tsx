import { useState } from "react";
import MessageItem from "./MessageItem";
import * as M from './MessageList.styled'

const MessageList = () => {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(true);
  const data = [
    <MessageItem />,
    <MessageItem />,
    <MessageItem />,
    <MessageItem />,
    <MessageItem />,
    <MessageItem />,
  ];

  const visibleData = isSeeMore ? data.slice(0, 3) : data;

  return (
    <M.Container>
      <M.Wrap>
        <M.Text>{"작성자"}님의 친구들이 남긴 ㅊㅋ</M.Text>
        {data && visibleData.map((item) => <MessageItem key='' />)}
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
