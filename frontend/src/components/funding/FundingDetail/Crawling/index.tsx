import * as C from "./FundingCrawling.styled";

type CrawlingType = {
  percent: number;
  image: string;
  title: string;
  date: string;
  goalAmount: number;
  remainAmount: number;
  dDay: number;
};

const index = (props: CrawlingType) => {
  const { percent, image, title, date, goalAmount, remainAmount, dDay } = props;

  const formatDate = date.split("-")[1] + "월 " + date.split("-")[2] + "일";

  return (
    <C.Container>
      <C.HighLight>{formatDate} ㅊㅋ</C.HighLight>
      <C.Img src={image} />
      <div style={{color:'gray', fontSize:'1em'}} >구매 링크 바로가기</div>
      <C.Title>{title}</C.Title>
      <C.TopWrap>
        <div>
          목표까지 <C.HighLight>{remainAmount.toLocaleString()}</C.HighLight> 원
          남았어요
        </div>
        <C.HighLight>D-{dDay}</C.HighLight>
      </C.TopWrap>
      <C.GoalAmount>
        <C.CurrentAmount $percent={percent}></C.CurrentAmount>
      </C.GoalAmount>
      <C.BottomWrap>
        <div>{(goalAmount - remainAmount).toLocaleString()}원</div>
      </C.BottomWrap>
    </C.Container>
  );
};

export default index;
