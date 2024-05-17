import { fetchList } from "@/apis/event";
import EventCard from "@common/eventCard/EventCardLarge";
import { useEffect, useState } from "react";
import Pagination from "@common/pagination";
import Navbar from "@common/navbar";
import * as e from "./EventListPage.styled";

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
  bannerThumbnailUrl: string;
}

const EventListPage = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [recentEventData, setRecentEventData] = useState<EventData>({
    eventList: [],
    totalCnt: 0,
  });
  const [participantsEventData, setParticipantsEventData] = useState<EventData>(
    {
      eventList: [],
      totalCnt: 0,
    }
  );

  const onClickFilter = (index: number) => {
    setActiveIdx(index);
    setPage(1);
  };

  useEffect(() => {
    // 최근 날짜
    const fetchRecentEventList = async () => {
      try {
        const response = await fetchList("creatTime", page - 1, 6);
        setRecentEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecentEventList();

    // 참여자수
    const fetchPartiEventList = async () => {
      try {
        const response = await fetchList("participants", page - 1, 6);
        setParticipantsEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPartiEventList();
  }, [page]);

  return (
    <>
      <e.Container>
        <e.Img src="/img/img_logo.png" alt="" />
        <e.Title>공개된 ㅊㅋ</e.Title>
        <e.FilterWrap>
          <e.FilterText
            onClick={() => onClickFilter(0)}
            $active={activeIdx === 0}
          >
            최신순
          </e.FilterText>
          <e.FilterText
            onClick={() => onClickFilter(1)}
            $active={activeIdx === 1}
          >
            참여순
          </e.FilterText>
        </e.FilterWrap>
        {activeIdx === 0 ? (
          <e.DataWrap>
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
          </e.DataWrap>
        ) : (
          <e.DataWrap>
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
          </e.DataWrap>
        )}
        <e.PagiWrap>
          <Pagination
            totalPage={Math.ceil(participantsEventData.totalCnt / 6)}
            limit={5}
            page={page}
            setPage={setPage}
          />
        </e.PagiWrap>
      </e.Container>
      <Navbar current={""} />
    </>
  );
};

export default EventListPage;
