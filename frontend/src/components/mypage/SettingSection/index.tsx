import React from "react";
import styled from "styled-components";
import SettingItem from "./SettingItem";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px auto 0;
`;

const index = () => {
  // const userInfo = useRecoilValue(userState)
  const userInfo = false;

  return (
    <Container>
      <SettingItem
        title="계정"
        // text={userInfo.memberNo !== -1 ? userInfo.email : ''}
        imgSrc="/icon/icon_mypage1.png"
        width={11}
        height={14}
      />
      <SettingItem
        title="포인트 관리"
        url="/mypage/points"
        imgSrc="/icon/icon_mypage2.png"
        width={13}
        height={11}
      />
      <SettingItem
        title="후원내역"
        url="/mypage/donate"
        imgSrc="/icon/icon_mypage3.png"
        width={11}
        height={15}
      />
    </Container>
  );
};

export default index;
