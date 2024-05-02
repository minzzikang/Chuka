import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
`;

const Desc = styled.div`
  font-size: 0.8em;
  white-space: pre-line;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;

const EventWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SmallBtn = styled.button`
  background-color: ${colors.mainPink};
  color: #ffff;
  font-size: 0.8em;
  width: 80px;
  height: 25px;
`;

const InputWrap = styled.div`

`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding-left: 10px;
`;

const PhoneInput = styled.input`
  width: 100%;
  height: 39px;
  border: none;
  padding-left: 10px;
`;

const Label = styled.label``;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Text = styled.div`
  color: ${colors.gray};
  font-size: 0.8em;
`;

export type ReviewSectionType = {
    comment:string
    setComment: (value:string) => void
    phone:string
    setPhone: (value:string) => void
}

const index = (props: ReviewSectionType) => {

    const { comment, setComment, phone, setPhone} = props
    



  return (
    <Container>
      <Wrap>
        <EventWrap>
          <SmallBtn>이벤트 기간</SmallBtn>
          <Desc>
            {"2024. 5. 13"} ~ {"2024. 5. 19"}
          </Desc>
        </EventWrap>
        <EventWrap>
          <SmallBtn>상품 안내</SmallBtn>
          <Desc>5명 - 스타벅스 아메리카노 기프티콘</Desc>
        </EventWrap>
      </Wrap>
      <InputWrap>
        <Label htmlFor="comment">피드백 작성</Label>
        <TextArea
          id="comment"
          placeholder="추카 서비스를 이용하면서 불편했던 점이나 좋았던 점에 대해 작성해주세요(100자 이내)"
          value={comment}
          onChange={(e) => setComment(e.target.value) }
          maxLength={100}
        />
        <Label htmlFor="phone">휴대폰 번호</Label>
        <PhoneInput
          id="phone"
          placeholder="휴대폰 번호는 경품 추첨에 이용됩니다.(ex: 01012341234)"
          value={phone}
          onChange={(e) => setPhone(e.target.value) }
          maxLength={11}
        />
      </InputWrap>
      <TextWrap>
        <Text>추카를 이용해주셔서 감사합니다</Text>
        <Text>후기는 익명으로 공개됩니다</Text>
        <Text>여러분의 소중한 의견으로 더 나은 추카가 되겠습니다</Text>
      </TextWrap>
    </Container>
  );
};

export default index;
