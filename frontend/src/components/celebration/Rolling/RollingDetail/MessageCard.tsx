import * as m from "./MessageCard.styled";
import { useEffect, useState } from "react";


interface MessageProps {
  eventId: string;
  nickname: string;
  content: string;
}

const MessageCard = ({ eventId, nickname, content }: MessageProps) => {
  return (
    <>
      <m.Container>
        <m.MessageBox>
          {content}
          <m.Nickname>From. {nickname}</m.Nickname>
        </m.MessageBox>
      </m.Container>
    </>
  );
};

export default MessageCard;
