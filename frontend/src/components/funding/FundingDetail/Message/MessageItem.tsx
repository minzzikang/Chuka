import AuthRouter from "@/routers/AuthRouter";
import * as M from "./MessageItem.styled";

interface MessageItemProps {
  sponsorId: number;
  amount: number;
  comment: string;
  nickname: string;
  profileImage: string;
  rank: number;
}

const MessageItem = (props: MessageItemProps) => {
  const { sponsorId, amount, comment, nickname, profileImage, rank } = props;
  const setMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return "/icon/icon_gold_medal.png";
      case 2:
        return "/icon/icon_silver_medal.png";
      case 3:
        return "/icon/icon_bronze_medal.png";
      default:
        return ""; // 3순위 밖은 메달 이미지 x
    }
  };

  return (
    <M.Container>
      <M.Profile
        src={
          profileImage === "프로필이미지"
            ? "/img/img_default_profile.png"
            : profileImage
        }
        alt="profile"
      />
      <M.RightWrap>
        <M.TextWrap>
          <M.Text>From. {nickname}</M.Text>
          <M.Text>{comment}</M.Text>
        </M.TextWrap>
        <div>
          {setMedal(rank) && <M.Medal src={setMedal(rank)} />}
          <M.Highlight>{amount.toLocaleString()}원</M.Highlight>
        </div>
      </M.RightWrap>
    </M.Container>
  );
};

export default MessageItem;
