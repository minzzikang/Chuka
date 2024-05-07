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
  const [isSeeMore, setIsSeeMore] = useState<boolean>(true);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [eventData, setEventData] = useState([]);

  const onClickFilter = (index: number) => {
    setActiveIdx(index);
  };

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await fetchList(true, page, 3);
        console.log("이벤트 리스트 @@@@@@@@@@@@@@", response);

        setEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventList();
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
          조회수순
        </h.FilterText>
      </h.FilterWrap>
      <DataWrap>
        {eventData && eventData.map((item, index) => <EventCard key={index} title={item.title} createTime={item.createTime} date={item.date} thumbNailUrl={item.bannerThumbnailUrl} />)}
      </DataWrap>
      <PagiWrap>
        <Pagination totalPage={54} limit={5} page={page} setPage={setPage} />
      </PagiWrap>
    </h.Container>
  );
};

export default index;
