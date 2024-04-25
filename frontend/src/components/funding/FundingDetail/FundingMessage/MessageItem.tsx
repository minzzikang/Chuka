import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${colors.inputGray};
  border-radius: 10px;
`;
const Profile = styled.img`
  width: 45px;
  height: 45px;
  margin: 10px;
`;

const RightWrap = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Text = styled.div`
  font-size: 1em;
`;

const Medal = styled.img`
  margin-bottom: 10%;
`;

const MessageItem = () => {
  const setMedal = (key: any) => {
    switch (key) {
      case "GOLD":
        return {
          src: "/icon/icon_gold_medal.png",
          width: "10%",
          height: "10%",
        };
      case "SILVER":
        return {
          src: "/icon/icon_silver_medal.png",
          width: "10%",
          height: "10%",
        };
      case "BRONZE":
        return {
          src: "/icon/icon_bronze_medal.png",
          width: "10%",
          height: "10%",
        };
      default:
        break;
    }
  };

  return (
    <Container>
      <Profile src="/img/img_default_profile.png" alt="" />
      <RightWrap>
        <TextWrap>
          <Text>From. {"뿌뿌뿌"}</Text>
          <Text>야 축하한다</Text>
        </TextWrap>
        <Medal src="/icon/icon_gold_medal.png" />
      </RightWrap>
    </Container>
  );
};

export default MessageItem;
