import * as N from "./NotificationListItem.styled";

interface NotificaionProps {
  content: string;
  creationDateTime: string;
  type: string;
}

const NotificationListItem = (props: NotificaionProps) => {
  const { content, creationDateTime, type } = props;
  const onClick = () => {
    console.log("상세페이지 이동");
  };

  const setImage = (type: string) => {
    switch (type) {
      case "EVENT_CREATE":
        return {
          src: "icon/icon_alarm_event.png",
          width: "20px",
          height: "20px",
        };
      case "FUNDING_APPROVED":
        return {
          src: "icon/icon_alarm_funding_end.png",
          width: "30px",
          height: "30px",
        };
      case "EVENT_OPEN":
        return {
          src: "icon/icon_alarm_funding_dday.png",
          width: "26px",
          height: "25px",
        };
      case "FUNDING_COMPLETE":
        return {
          src: "icon/icon_alarm_funding_success.png",
          width: "25px",
          height: "23.1px",
        };
      case "FUNDING_DISAPPROVED":
        return {
          src: "icon/icon_alarm_funding_fail.png",
          width: "25px",
          height: "25px",
        };
    }
  };

  const icon = setImage(type);

  return (
    <N.Container onClick={onClick}>
      <N.Wrap>
        <N.LeftWrap>
          <N.ImgWrap>
            <img src={icon?.src} alt="icon" />
          </N.ImgWrap>
          <N.TextWrap>
            <N.Comment>{content}</N.Comment>
            <N.Date>{creationDateTime}</N.Date>
          </N.TextWrap>
        </N.LeftWrap>
        <N.Delete>
          <img src="icon/icon_trash.png" alt="" />
        </N.Delete>
      </N.Wrap>
    </N.Container>
  );
};

export default NotificationListItem;
