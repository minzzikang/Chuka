import { useNavigate } from "react-router";
import * as e from './EventCard.styled'
import { EventCardType } from "./EventCard.styled";
import { formattingTitle } from "@/utils/stringFormat";

const index = (props: EventCardType) => {
const navigate = useNavigate()
  const {title, createTime, date, thumbNailUrl, eventUrl} = props

  const formatCreateTime = createTime.split("T")[0]
  const formatTitle = formattingTitle(title)


  // const formatDDay = date - today

  return (
    <e.Container $thumbNailUrl={thumbNailUrl} onClick={() => navigate(`${eventUrl}`)} >
      <e.Wrap>
        <e.WrapOverlay>
          <e.DescWrap>
            <e.Title>{formatTitle}</e.Title>
            <e.Date>
              D-DAY : {date}
              {/* {formatCreateTime} ~  */}
            </e.Date>
          </e.DescWrap>
        </e.WrapOverlay>
      </e.Wrap>
    </e.Container>
  );
};

export default index;
