import EventBanner from "@common/eventBanner";
import { useEffect, useState } from "react";
import * as h from "@components/home/HomeEventList/HomeEventList.styled";
import { fetchList } from "@/apis/event";

const index = () => {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(true);
  const data = [
    // 이벤트 카드로 대체해 ! -> 캐러셀로 만들자 !
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
  ];

  const visibleData = isSeeMore ? data.slice(0, 3) : data;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [eventData, setEventData] = useState([]);

  const onClickFilter = (index: number) => {
    setActiveIdx(index);
  };

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await fetchList();
        console.log("이벤트 리스트 @@@@@@@@@@@@@@", response);
        setEventData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventList();
  }, [eventData]);

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

      {data && visibleData.map((item, index) => <EventBanner key={index} />)}

      {isSeeMore ? (
        <h.SeeMoreBtn
          onClick={() => {
            setIsSeeMore(false);
          }}
        >
          더 많은 ㅊㅋ 보기
        </h.SeeMoreBtn>
      ) : (
        <h.SeeMoreBtn
          onClick={() => {
            setIsSeeMore(true);
          }}
        >
          접기
        </h.SeeMoreBtn>
      )}
    </h.Container>
  );
};

export default index;
