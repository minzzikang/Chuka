import * as C from './FundingCrawling.styled'
type CrawlingType = {
  percent: number;
};

const index = (props: CrawlingType) => {
  const { percent } = props;

  return (
    <C.Container>
      <C.HighLight>
        {"작성자"}님의 {"04월 10일"} ㅊㅋ
      </C.HighLight>
      <C.Title>이벤트 타이틀</C.Title>
      <C.Img src={"img/img_present_funding.png"} />
      <C.TopWrap>
        <div>
          목표까지 <C.HighLight>{125000}</C.HighLight> 원 남았어요
        </div>
        <C.HighLight>{"D-20"}</C.HighLight>
      </C.TopWrap>
      <C.GoalAmount>
        <C.CurrentAmount $percent={percent}></C.CurrentAmount>
      </C.GoalAmount>
      <C.BottomWrap>
        <div>{480000}원</div>
      </C.BottomWrap>
    </C.Container>
  );
};

export default index;
