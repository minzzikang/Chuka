import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95px;

  border-bottom: 2px solid #fff;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #fff;
`;

const LeftWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Comment = styled.div`
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 10px;
`;

const Date = styled.div`
  font-size: 10px;
  color: ${colors.gray};
`;

const Delete = styled.div`
  width: 18px;
  height: 18px;
`;

const AlarmListItem = () => {
  const onClick = () => {
    console.log("상세페이지 이동");
  };

  const setImage = (key: any) => {
    switch (key) {
      case "REGISTER":
        return {
          src: "icon/icon_alarm_event.png",
          width: "20px",
          height: "20px",
        };
      case "FUNDING":
        return {
          src: "icon/icon_alarm_funding_end.png",
          width: "30px",
          height: "30px",
        };
      case "DDAY":
        return {
          src: "icon/icon_alarm_funding_dday.png",
          width: "26px",
          height: "25px",
        };
      case "APPROVE":
        return {
          src: "icon/icon_alarm_funding_success.png",
          width: "25px",
          height: "23.1px",
        };
      case "REJECT":
        return {
          src: "icon/icon_alarm_funding_fail.png",
          width: "25px",
          height: "25px",
        };
    }
  };

  return (
    <Container onClick={onClick}>
      <Wrap>
        <LeftWrap>
          <ImgWrap>
            <img src="icon/icon_alarm_event.png" alt="" />
          </ImgWrap>
          <TextWrap>
            <Comment>ㅊㅋ가 등록되었습니다</Comment>
            <Title>이벤트 제목</Title>
            <Date>2024.04.08 12:13</Date>
          </TextWrap>
        </LeftWrap>
        <Delete>
          <img src="icon/icon_trash.png" alt="" />
        </Delete>
      </Wrap>
    </Container>
  );
};

export default AlarmListItem;
