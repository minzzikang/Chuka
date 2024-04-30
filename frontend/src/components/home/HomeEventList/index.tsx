import EventBanner from "@common/eventBanner";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";
import { set } from "date-fns";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

`;

const Title = styled.div`
font-size: 1.5em;
font-weight: 700;
margin: auto auto;
`

const FilterWrap = styled.div`
display: flex;
gap: 10px;
justify-content: flex-end ;

`

const FilterText = styled.div<{$active:boolean}>`
  font-size: 1em;
  color: ${(props) => props.$active ? colors.mainPink: colors.black};
`

export const SeeMoreBtn = styled.button`
  width: 100%;
  height: 49px;
  border: 1px solid ${colors.mainPink};
  border-radius: 5px;
  color: ${colors.mainPink};
`;

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

  const [activeIdx, setActiveIdx] = useState<number>(0)

  const onClickFilter = (index:number) => {
    setActiveIdx(index)

  }


  return (
    <Container>

      <Title>공개된 ㅊㅋ</Title>
      <FilterWrap>
        <FilterText onClick={() => onClickFilter(0)} $active={activeIdx === 0}>최신순</FilterText>
        <FilterText onClick={() => onClickFilter(1)} $active={activeIdx === 1}>조회수순</FilterText>
      </FilterWrap>


      {data && visibleData.map((item, index) => <EventBanner key={index} />)}

      {isSeeMore ? (
        <SeeMoreBtn
          onClick={() => {
            setIsSeeMore(false);
          }}
        >
          더 많은 ㅊㅋ 보기
        </SeeMoreBtn>
      ) : (
        <SeeMoreBtn
          onClick={() => {
            setIsSeeMore(true);
          }}
        >
          접기
        </SeeMoreBtn>
      )}
    </Container>
  );
};

export default index;
