import * as e from "./Event.styled";
import EventCard from "@components/mypage/Event/EventCard";
import { EventDataType } from "@/types/rollingType";
import Pagination from "@common/pagination";
import { useEffect } from "react";

interface EventProps {
  eventList: EventDataType;
  title: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const index = (props: EventProps) => {
  const { eventList, title, currentPage, setCurrentPage } = props;

  useEffect(() => {
    console.log(eventList.totalCnt);
  }, []);

  return (
    <>
      <e.Container>
        <e.Wrap>
          <e.Label>{title}</e.Label>
          {eventList.totalCnt > 0 && (
            <>
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
            </>
          )}
        </e.Wrap>
        {eventList.totalCnt > 0 && (
          <e.PagiWrap>
            <Pagination
              totalPage={Math.ceil(eventList.totalCnt / 3)}
              limit={3}
              page={currentPage}
              setPage={setCurrentPage}
            />
          </e.PagiWrap>
        )}
        {eventList.totalCnt === 0 && <p>이벤트 정보가 없습니다.</p>}
      </e.Container>
    </>
  );
};

export default index;
