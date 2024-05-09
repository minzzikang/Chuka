import * as e from "./Event.styled";
import EventCard from "@components/mypage/Event/EventCard";
import { EventDataType } from "@/types/rollingType";

interface EventProps {
  eventList: EventDataType;
  title: string;
}

const index = (props: EventProps) => {
  const { eventList, title } = props;

  return (
    <>
      <e.Container>
        <e.Wrap>
          <e.Label>{title}</e.Label>
          <e.CardWrap>
            {eventList.totalCnt > 0 ? (
              eventList.eventList.map((event, index) => (
                <EventCard
                  key={index}
                  eventId={event.eventId}
                  title={event.title}
                  pageUri={event.pageUri}
                  createTime={event.createTime}
                  bannerThumbnailUrl={event.bannerThumbnailUrl}
                  date={event.date}
                />
              ))
            ) : (
              <p>이벤트를 조회할 수 없습니다.</p>
            )}
          </e.CardWrap>
        </e.Wrap>
      </e.Container>
    </>
  );
};

export default index;
