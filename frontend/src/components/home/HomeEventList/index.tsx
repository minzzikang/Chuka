import EventCard from "@common/eventCard";
import { useEffect, useState } from "react";
import * as h from "@components/home/HomeEventList/HomeEventList.styled";
import { fetchList } from "@/apis/event";
import Pagination from "@common/pagination";
import styled from "styled-components";

export const DataWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const PagiWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [recentEventData, setRecentEventData] = useState([]);

  const onClickFilter = (index: number) => {
    setActiveIdx(index);
  };

  useEffect(() => {
    const fetchRecentEventList = async () => {
      try {
        const response = await fetchList(true, page, 3);
        console.log("이벤트 리스트 @@@@@@@@@@@@@@", response);
        setRecentEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecentEventList();
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
      {activeIdx === 0 && (
        <DataWrap>
          {recentEventData &&
            recentEventData.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                createTime={item.createTime}
                date={item.date}
                thumbNailUrl={item.bannerThumbnailUrl}
                eventUrl={`/celebrate/rolling/${item.eventId}/${item.pageUri}`}

              // http://localhost:5000/celebrate/rolling/1/01HWC09NK9Y5GA5F53WYNPST1C
              />
            ))}
        </DataWrap>
      )}

      <PagiWrap>
        <Pagination totalPage={20} limit={5} page={page} setPage={setPage} />
      </PagiWrap>
    </h.Container>
  );
};

export default index;
