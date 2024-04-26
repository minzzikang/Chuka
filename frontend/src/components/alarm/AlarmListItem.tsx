import * as A from './AlarmListItem.styled'

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
    <A.Container onClick={onClick}>
      <A.Wrap>
        <A.LeftWrap>
          <A.ImgWrap>
            <img src="icon/icon_alarm_event.png" alt="" />
          </A.ImgWrap>
          <A.TextWrap>
            <A.Comment>ㅊㅋ가 등록되었습니다</A.Comment>
            <A.Title>이벤트 제목</A.Title>
            <A.Date>2024.04.08 12:13</A.Date>
          </A.TextWrap>
        </A.LeftWrap>
        <A.Delete>
          <img src="icon/icon_trash.png" alt="" />
        </A.Delete>
      </A.Wrap>
    </A.Container>
  );
};

export default AlarmListItem;
