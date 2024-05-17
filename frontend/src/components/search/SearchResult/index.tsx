import { EventDataType } from "@/types/rollingType";
import EventCard from "@components/mypage/Event/EventCard";
import * as s from "./SearchResult.styled"

const index = (props: { result: EventDataType }) => {
  const { result } = props;

  return (
    <s.Container>
      <s.Title>총 {result.totalCnt}건</s.Title>
      {result.totalCnt === 0 ? (
        <s.Empty>검색 결과가 없습니다.</s.Empty>
      ) : (
        <s.ScrollArea>
          {result.eventList.map((item, index) => (
            <EventCard
              key={index}
              eventId={item.eventId}
              pageUri={item.pageUri}
              bannerThumbnailUrl={item.bannerThumbnailUrl}
              title={item.title}
              date={item.date}
              createTime={item.createTime}
            />
          ))}
        </s.ScrollArea>
      )}
    </s.Container>
  );
};

export default index;
