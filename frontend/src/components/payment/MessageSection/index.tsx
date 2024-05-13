import { MessageSectionType } from "@/types/fundingType";
import * as m from "./MessageSection.styled"

const index = (props: MessageSectionType) => {
  const { nickname, setNickname, comment, setComment } = props;

  return (
    <m.Container>
      <m.Title>펀딩 메시지</m.Title>
      <m.InputWrap>
        <m.Label htmlFor="nickname">닉네임</m.Label>
        <m.Input
          id="nickname"
          placeholder="닉네임을 입력해주세요(15자 이내)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={15}
        />
      </m.InputWrap>
      <m.InputWrap>
        <m.Label htmlFor="comment">메시지</m.Label>
        <m.Textarea
          id="comment"
          placeholder="펀딩 대상자에게 남길 축하 메시지를 입력해주세요(50자 이내)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={50}
        />
      </m.InputWrap>
    </m.Container>
  );
};

export default index;
