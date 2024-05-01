import AuthRouter from "@/routers/AuthRouter";
import * as M from "./MessageItem.styled";

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
    <M.Container>
      <M.Profile src="/img/img_default_profile.png" alt="" />
      <M.RightWrap>
        <M.TextWrap>
          <M.Text>From. {"고릴라"}</M.Text>
          <M.Text>{"야 축하한다"}</M.Text>
        </M.TextWrap>
        <div>
          <M.Medal src="/icon/icon_gold_medal.png" />
          <M.Highlight>{"100000원"}</M.Highlight>
        </div>
      </M.RightWrap>
    </M.Container>
  );
};

export default MessageItem;
