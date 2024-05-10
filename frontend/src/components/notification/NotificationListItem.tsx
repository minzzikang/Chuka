import { useEffect } from "react";
import * as N from "./NotificationListItem.styled";
import { FaRegTrashCan } from "react-icons/fa6";
import { colors } from "@/styles/theme";

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

  useEffect(() => {
    console.log(type);
  }, [type]);

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
          src: "icon/icon_alarm_dday.png",
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
      default:
        return {
          src: "",
        };
    }
  };

  const icon = setImage(type);
  const formatDate =
    creationDateTime.split("T")[0] + " " + creationDateTime.split("T")[1];

  return (
    <N.Container onClick={onClick}>
      <N.Wrap>
        <N.LeftWrap>
          <N.ImgWrap>
            <img src={icon?.src} alt="icon" />
          </N.ImgWrap>
          <N.TextWrap>
            <N.Comment>{content}</N.Comment>
            <N.Date>{formatDate}</N.Date>
          </N.TextWrap>
        </N.LeftWrap>
        <N.Delete>
          <FaRegTrashCan color={colors.gray} />
        </N.Delete>
      </N.Wrap>
    </N.Container>
  );
};

export default NotificationListItem;
