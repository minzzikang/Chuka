import * as e from "./Event.styled";
import EventCard from "@components/mypage/Event/EventCard";
import { EventDataType } from "@/types/rollingType";
import Pagination from "@common/pagination";

interface EventProps {
  eventList: EventDataType;
  title: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const index = (props: EventProps) => {
  const { eventList, title, currentPage, setCurrentPage } = props;

  return (
    <>
      <e.Container>
        <e.Wrap>
          <e.Label>{title}</e.Label>
          <e.CardWrap>
            {eventList.eventList.map((event, index) => (
              <EventCard
                key={index}
                eventId={event.eventId}
                title={event.title}
                pageUri={event.pageUri}
                createTime={event.createTime}
                bannerThumbnailUrl={event.bannerThumbnailUrl}
                date={event.date}
              />
            ))}
          </e.CardWrap>
        </e.Wrap>
        <e.PagiWrap>
          <Pagination totalPage={eventList.totalCnt} limit={3} page={currentPage} setPage={setCurrentPage} />
        </e.PagiWrap>
      </e.Container>
    </>
  );
};

export default index;
