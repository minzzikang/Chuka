import { EventDataType } from "@/types/rollingType";
import { colors } from "@/styles/theme";
import styled from "styled-components";
import EventCard from "@components/mypage/Event/EventCard";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin-block: 10px;
  padding: 0 5%;
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
    width: 0; /* Remove scrollbar space */
    height: 0;
    background: transparent; /* Optional: just make scrollbar invisible */
    -webkit-appearance: none;
  }
`;

export const Empty = styled.div`
  display: flex;
  padding: 0 5%;
  color: ${colors.gray};
`;

const index = (props: { result: EventDataType }) => {
  const { result } = props;

  return (
    <Container>
      <Title>총 {result.totalCnt}건</Title>
      {result.totalCnt === 0 ? (
        <Empty>검색 결과가 없습니다.</Empty>
      ) : (
        <ScrollArea>
          {result.eventList.map((item, index) => (
            <EventCard
              key={index}
              eventId={item.eventId}
              pageUri={item.pageUri}
              title={item.title}
              date={item.date}
              createTime={item.createTime}
            />
          ))}
        </ScrollArea>
      )}
    </Container>
  );
};

export default index;
