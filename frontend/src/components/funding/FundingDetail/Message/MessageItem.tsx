import AuthRouter from "@/routers/AuthRouter";
import * as M from "./MessageItem.styled";

interface MessageItemProps {
  sponsorId: number;
  amount: number;
  comment: string;
  nickname: string;
  profileImage: string;
}

const MessageItem = (props: MessageItemProps) => {
  const { sponsorId, amount, comment, nickname, profileImage } = props;
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
    <M.Container>
      <M.Profile src="/img/img_default_profile.png" alt="" />
      <M.RightWrap>
        <M.TextWrap>
          <M.Text>From. {nickname}</M.Text>
          <M.Text>{comment}</M.Text>
        </M.TextWrap>
        <div>
          <M.Medal src="/icon/icon_gold_medal.png" />
          <M.Highlight>{amount}원</M.Highlight>
        </div>
      </M.RightWrap>
    </M.Container>
  );
};

export default MessageItem;
