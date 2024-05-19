import * as e from "./EventCard.styled";
import { useNavigate } from "react-router-dom";
import { EventItem } from "@/types/rollingType";
import { formattingMyPage } from "@/utils/stringFormat";
import { calculateDay } from "@/utils/calculation";

const index = (props: EventItem) => {
  const { title, bannerThumbnailUrl, date, eventId, pageUri, createTime } =
    props;

  const navigate = useNavigate();

  const goPage = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
  };

  const dDay = calculateDay(date);
  const isActive = dDay.startsWith("-") || dDay === "-DAY";


  return (
    <e.Container $imgSrc={bannerThumbnailUrl} onClick={goPage}>
      <e.InfoWrap>
        <e.Dday>D{dDay}</e.Dday>
        <e.Title>{formattingMyPage(title)}</e.Title>
        <e.Date>{date}</e.Date>
      </e.InfoWrap>
      <e.IconWrap>
        <e.Badge $result={isActive}>{isActive ? "진행 중" : "공개"}</e.Badge>
        {/* <img src={Trash} alt="delete" onClick={() => {}} /> */}
      </e.IconWrap>
    </e.Container>
  );
};

export default index;
