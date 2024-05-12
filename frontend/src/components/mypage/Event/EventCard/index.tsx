import * as e from "./EventCard.styled";
import { useNavigate } from "react-router-dom";
import { EventItem } from "@/types/rollingType";

const index = (props: EventItem) => {
  const { title, bannerThumbnailUrl, date, eventId, pageUri, createTime } =
    props;

  const navigate = useNavigate();

  const goPage = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
  };

  const calculateDay = (
    eventDate: string | undefined,
    creationTime: string | undefined
  ) => {
    //  예외처리
    if (!eventDate || !creationTime) {
      return 0;
    }

    const eventDateObj = new Date(eventDate);
    const creationDateObj = new Date(creationTime.split("T")[0]);
    const diff = eventDateObj.getTime() - creationDateObj.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const dDay = calculateDay(date, createTime);
  const isActive = dDay > 0 ? true : false;

  return (
    <e.Container $imgSrc={bannerThumbnailUrl} onClick={goPage}>
      <e.InfoWrap>
        <e.Dday>D-{dDay}</e.Dday>
        <e.Title>{title}</e.Title>
        <e.Date>{date}</e.Date>
      </e.InfoWrap>
      <e.IconWrap>
        <e.Badge $result={isActive}>{isActive ? '진행 중' : '종료'}</e.Badge>
        {/* <img src={Trash} alt="delete" onClick={() => {}} /> */}
      </e.IconWrap>
    </e.Container>
  );
};

export default index;
