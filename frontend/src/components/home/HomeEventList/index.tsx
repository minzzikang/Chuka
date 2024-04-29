import EventBanner from '@common/eventBanner'
import { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 100%;

`


const index = () => {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(true);
  const data = [
    // 이벤트 카드로 대체해 ! -> 캐러셀로 만들자 !
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
    <EventBanner />,
  ]

  const visibleData = isSeeMore ? data.slice(0, 3) : data;

  return (
    <Container>
      {data && visibleData.map((item) => <EventBanner/>)}

      <EventBanner />
      <EventBanner />
      <EventBanner />
      <EventBanner />
      <EventBanner />
    </Container>
  );
};

export default index;