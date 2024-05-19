import * as N from "./NotificationListItem.styled";
import { colors } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

interface NotificaionProps {
  content: string;
  createDateTime: string;
  type: string;
  eventId?: number;
  fundingId?: number;
  pageUri?: string;
  notificationId: string;
  eventTitle?: string;
  handleDelete: (notificationId: string) => void;
}

const NotificationListItem = (props: NotificaionProps) => {
  const {
    content,
    createDateTime,
    type,
    eventId,
    fundingId,
    pageUri,
    notificationId,
    handleDelete,
    eventTitle,
  } = props;

  const navigate = useNavigate();

  const goNavigate = () => {
    switch (type) {
      case "EVENT_CREATE":
        navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
        break;
      case "EVENT_OPEN":
        navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
        break;
      case "ROLLING_CREATE":
        navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
        break;
      case "FUNDING_COMPLETE":
        navigate(`/celebrate/funding/${fundingId}`);
        break;
    }
  };

  const setImage = (type: string) => {
    switch (type) {
      case "EVENT_CREATE":
        return {
          src: "icon/icon_alarm_event.png",
          width: "20px",
          height: "20px",
        };
      case "EVENT_OPEN":
        return {
          src: "icon/icon_alarm_dday.png",
          width: "26px",
          height: "25px",
        };
      case "ROLLING_CREATE":
        return {
          src: "icon/icon_goRoll.png",
          width: "18px",
          height: "18px",
        };
      case "FUNDING_COMPLETE":
        return {
          src: "icon/icon_alarm_funding_success.png",
          width: "25px",
          height: "23.1px",
        };
    }
  };

  const icon = setImage(type);
  const formatDate =
    createDateTime.split("T")[0] + " " + createDateTime.split("T")[1];

  return (
    <N.Container onClick={goNavigate}>
      <N.Wrap>
        <N.LeftWrap>
          <N.ImgWrap>
            <img src={icon?.src} alt="icon" width={icon?.width} height={icon?.height}/>
          </N.ImgWrap>
          <N.TextWrap>
            <N.Comment>{content}</N.Comment>
            <N.Title>{eventTitle}</N.Title>
            <N.Date>{formatDate}</N.Date>
          </N.TextWrap>
        </N.LeftWrap>
        <N.Delete
          src="/icon/icon_trash.png"
          onClick={(e) => {
            e.stopPropagation(); // 부모요소로 bubble 되는 것을 막음
            handleDelete(notificationId);
          }}
        />
      </N.Wrap>
    </N.Container>
  );
};

export default NotificationListItem;
