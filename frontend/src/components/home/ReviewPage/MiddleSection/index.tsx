import * as m from "./MiddleSection.styled";

export type ReviewSectionType = {
  comment: string;
  setComment: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
};

const index = (props: ReviewSectionType) => {
  const { comment, setComment, phone, setPhone } = props;

  return (
    <m.Container>
      <m.IntroWrap>
        <m.EventWrap>
          <m.SmallBtn>이벤트 기간</m.SmallBtn>
          <m.Desc>
            {"2024. 5. 13"} ~ {"2024. 5. 19"}
          </m.Desc>
        </m.EventWrap>
        <m.EventWrap>
          <m.SmallBtn>상품 안내</m.SmallBtn>
          <m.Desc>5명 - 메가 커피 아메리카노 기프티콘</m.Desc>
        </m.EventWrap>
      </m.IntroWrap>
      <m.InputWrap>
        <m.Label htmlFor="comment">피드백 작성</m.Label>
        <m.TextArea
          id="comment"
          placeholder="추카 서비스를 이용하면서 불편했던 점이나 좋았던 점에 대해 작성해주세요(100자 이내)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={100}
        />
        <m.Label htmlFor="phone">휴대폰 번호</m.Label>
        <m.PhoneInput
          id="phone"
          placeholder="휴대폰 번호는 경품 추첨에 이용됩니다.(01012341234)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={11}
        />
      </m.InputWrap>
      <m.TextWrap>
        <m.Text>* 추카를 이용해주셔서 감사합니다</m.Text>
        <m.Text>* 후기는 익명으로 공개됩니다</m.Text>
        <m.Text>* 여러분의 소중한 의견으로 더 나은 추카가 되겠습니다</m.Text>
      </m.TextWrap>
    </m.Container>
  );
};

export default index;
