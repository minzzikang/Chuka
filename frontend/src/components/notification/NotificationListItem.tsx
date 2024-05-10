import * as N from './NotificationListItem.styled'

const NotificationListItem
 = () => {
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
    <N.Container onClick={onClick}>
      <N.Wrap>
        <N.LeftWrap>
          <N.ImgWrap>
            <img src="icon/icon_alarm_event.png" alt="" />
          </N.ImgWrap>
          <N.TextWrap>
            <N.Comment>ㅊㅋ가 등록되었습니다</N.Comment>
            <N.Title>이벤트 제목</N.Title>
            <N.Date>2024.04.08 12:13</N.Date>
          </N.TextWrap>
        </N.LeftWrap>
        <N.Delete>
          <img src="icon/icon_trash.png" alt="" />
        </N.Delete>
      </N.Wrap>
    </N.Container>
  );
};

export default NotificationListItem
;
