import React, { useState } from "react";
import MessageList from "./MessageList";
import * as F from './FundingMessage.styled'



const index = () => {

  return (
    <F.Container>
      <F.Wrap>
        <F.Text>펀딩 소개</F.Text>
        <F.Intro>{'이 펀딩을 소개하는 문구입니다.'}</F.Intro>
      </F.Wrap>
      {/* 메시지 리스트 */}
      <MessageList/>
    </F.Container>
  );
};

export default index;
