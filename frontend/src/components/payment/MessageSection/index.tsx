import styled from "styled-components";
import { MessageSectionType } from "@/types/fundingType";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: 600;
`;

export const Label = styled.label`
  font-size: 1em;
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 0.9em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 0.9em;
`;

const index = (props: MessageSectionType) => {
  const { nickname, setNickname, comment, setComment } = props;

  return (
    <Container>
      <Title>펀딩 메시지</Title>
      <InputWrap>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          placeholder="닉네임을 입력해주세요(15자 이내)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={15}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="comment">메시지</Label>
        <Textarea
          id="comment"
          placeholder="펀딩 대상자에게 남길 축하 메시지를 입력해주세요(50자 이내)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={50}
        />
      </InputWrap>
    </Container>
  );
};

export default index;
