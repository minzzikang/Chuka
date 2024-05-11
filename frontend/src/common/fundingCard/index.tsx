import { useNavigate } from "react-router";
import * as f from "./FundingCard.styled";
import { formattingTitle } from "@/utils/stringFormat";

export type FundingCardType = {
    fundingId:number
    productImgUrl:string
    productName:string
    introduce:string
    startDate:string
    endDate:string
    fundingResult:string
}

const index = (props: FundingCardType) => {
  const navigate = useNavigate();
  const { fundingId ,productImgUrl, productName, introduce, startDate, endDate, fundingResult } = props;

//   const formatCreateTime = createTime.split("T")[0];
  const formatName = formattingTitle(productName);

  // const formatDDay = date - today

  return (
    <f.Container
      $thumbNailUrl={productImgUrl}
      onClick={() => navigate(`/celebrate/funding/${fundingId}`)}
    >
      <f.Wrap>
        <f.WrapOverlay>
          <f.DescWrap>
            <f.Title>{formatName}</f.Title>
            <f.Date>
                {startDate} ~ {endDate}
              {/* {formatCreateTime} ~  */}
            </f.Date>
          </f.DescWrap>
        </f.WrapOverlay>
      </f.Wrap>
    </f.Container>
  );
};

export default index;
