import * as f from "./FundingItem.styled";
import { useNavigate } from "react-router-dom";
import Trash from "/icon/icon_trash.png";
import Badge from "@components/badge";

type FundingType = {
  percent: number;
};

const index = (props: FundingType) => {
  const { percent } = props;
  const navigate = useNavigate();

  return (
    <f.Container onClick={() => {}}>
      <f.Img src="/img/img_default_funding.png" alt="picture" />
      <f.Wrap>
        <f.RowWrap>
          <f.InfoWrap>
            <p>이벤트 제목</p>
            <f.Date>날짜</f.Date>
          </f.InfoWrap>
          <f.IconWrap>
            <Badge />
            <img src={Trash} alt="delete" onClick={() => {}} />
          </f.IconWrap>
        </f.RowWrap>
        <f.MoneyInfoWrap>
          <f.RowWrap>
            <p>모금액 {400000} 원</p>
            <div>
              <f.HighLight>37%</f.HighLight>
              <span>{"D-20"}</span>
            </div>
          </f.RowWrap>
          <f.GoalAmount>
            <f.CurrentAmount $percent={percent} />
          </f.GoalAmount>
        </f.MoneyInfoWrap>
      </f.Wrap>
    </f.Container>
  );
};

export default index;
