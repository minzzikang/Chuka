import * as f from "./FundingItem.styled";
import { useNavigate } from "react-router-dom";
import { colors } from "@/styles/theme";
import { FaRegTrashCan } from "react-icons/fa6";
import Badge from "@/common/badge";
import { useEffect, useState } from "react";
import { fetchFunding } from "@/apis/funding";

type FundingType = {
  fundingId?: number;
  eventDate?: string;
  eventTitle: string;
  status: string;
  goalAmount: number;
  remainAmount: number;
  dday: number;
  sponsors: [];
  introduce: string;
};

interface FundingProps {
  fundingId: number;
  introduce: string;
  fundingResult: string;
  productImage: string;
  startDate: string;
  endDate: string;
  handleDelete: (fundingId: number) => void;
}

const index = (props: FundingProps) => {
  const {
    fundingId,
    introduce,
    fundingResult,
    productImage,
    startDate,
    endDate,
    handleDelete,
  } = props;

  const navigate = useNavigate();
  const [values, setValues] = useState<FundingType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Funding = await fetchFunding(fundingId);
        setValues(Funding);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [fundingId]);

  const formatAmount = values?.goalAmount
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const calculateGoal = () => {
    if (!values) return 0;
    const percent =
      ((values.goalAmount - values.remainAmount) / values.goalAmount) * 100;
    return percent.toFixed(0);
  };

  return (
    <f.Container
      onClick={() =>
        navigate(`/celebrate/funding/${fundingId}`, {
          state: { fundingId: fundingId },
        })
      }
    >
      <f.Img
        src={productImage || "/img/img_default_funding.png"}
        alt="picture"
      />
      <f.Wrap>
        <f.RowWrap>
          <f.InfoWrap>
            <p>{introduce}</p>
            <f.Date>
              {startDate} ~ {endDate}
            </f.Date>
          </f.InfoWrap>
          <f.IconWrap>
            <Badge result={fundingResult} />
            {/* <FaRegTrashCan
              color={colors.gray}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(fundingId);
              }}
            /> */}
          </f.IconWrap>
        </f.RowWrap>
        <f.MoneyInfoWrap>
          <f.RowWrap>
            <p>모금액 {formatAmount} 원</p>
            <div>
              <f.HighLight>{calculateGoal()}%</f.HighLight>
              <span>D-{values?.dday}</span>
            </div>
          </f.RowWrap>
          <f.GoalAmount>
            <f.CurrentAmount $percent={+calculateGoal()} />
          </f.GoalAmount>
        </f.MoneyInfoWrap>
      </f.Wrap>
    </f.Container>
  );
};

export default index;
