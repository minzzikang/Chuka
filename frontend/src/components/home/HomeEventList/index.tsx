import EventCard from "@common/eventCard";
import { useEffect, useState } from "react";
import * as h from "@components/home/HomeEventList/HomeEventList.styled";
import { fetchList } from "@/apis/event";
import Pagination from "@common/pagination";

interface EventData {
  eventList: EventItem[];
  totalCnt: number;
}

interface EventItem {
  eventId: number;
  pageUri: string;
  title: string;
  createTime: string;
  date: string;
  bannerThumbnailUrl: string
}


const index = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [recentEventData, setRecentEventData] = useState<EventData>({
    eventList: [],
    totalCnt: 0
  });
  const [participantsEventData, setParticipantsEventData] = useState<EventData>({
    eventList: [],
    totalCnt: 0
  });

  const onClickFilter = (index: number) => {
    setActiveIdx(index);
    setPage(1)
  };

  useEffect(() => {
    // 최근 날짜
    const fetchRecentEventList = async () => {
      try {
        const response = await fetchList("creatTime", page-1, 3);
        console.log("최신순 @@@@", response);
        setRecentEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecentEventList();

    // 참여자수
    const fetchPartiEventList = async () => {
      try {
        const response = await fetchList("participants", page-1, 3);
        console.log("참여순 @@@@@", response);
        setParticipantsEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPartiEventList();
  }, [page]);

  return (
    <h.Container>
      <h.Title>공개된 ㅊㅋ</h.Title>
      <h.FilterWrap>
        <h.FilterText
          onClick={() => onClickFilter(0)}
          $active={activeIdx === 0}
        >
          최신순
        </h.FilterText>
        <h.FilterText
          onClick={() => onClickFilter(1)}
          $active={activeIdx === 1}
        >
          참여순
        </h.FilterText>
      </h.FilterWrap>
      {activeIdx === 0 ? (
        <h.DataWrap>
          {recentEventData &&
            recentEventData.eventList.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                createTime={item.createTime}
                date={item.date}
                thumbNailUrl={item.bannerThumbnailUrl}
                eventUrl={`/celebrate/rolling/${item.eventId}/${item.pageUri}`}
              />
            ))}
        </h.DataWrap>
      ) : (
        <h.DataWrap>
          {participantsEventData &&
            participantsEventData.eventList.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                createTime={item.createTime}
                date={item.date}
                thumbNailUrl={item.bannerThumbnailUrl}
                eventUrl={`/celebrate/rolling/${item.eventId}/${item.pageUri}`}
              />
            ))}
        </h.DataWrap>
      )}
      <h.PagiWrap>
        <Pagination
          totalPage={Math.ceil(participantsEventData.totalCnt / 3)}
          limit={5}
          page={page}
          setPage={setPage}
        />
      </h.PagiWrap>
    </h.Container>
  );
};

export default index;
