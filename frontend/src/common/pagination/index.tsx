import styled from "styled-components";
import { colors } from "@/styles/theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 5px;
`;

const PagiBtn = styled.div<PaginationBtnType>`
  width: 30px;
  height: 30px;
  border: 1px solid
    ${(props) => (props.$active ? colors.mainPink : colors.darkGray)};
  color: ${(props) => (props.$active ? colors.mainPink : colors.darkGray)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

export type PaginationType = {
  totalPage: number; // 전체 페이지 갯수
  limit: number; // 한번에 보여줄 pagination 갯수
  page: number;
  setPage: (page: number) => void;
};

export type PaginationBtnType = {
  children: number;
  key: number;
  $active: boolean;
  onClick: () => void;
  "aria-current": "page" | null;
};

export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = Array.from({ length: totalPage }, (_, i) => i);
  return Array.from({ length: Math.ceil(totalPage / limit) }, () =>
    totalPageArray.splice(0, limit)
  );
};

const index = (props: PaginationType) => {
  const { totalPage, limit, page, setPage } = props;

  const [currentPageItems, setCurrentPageItems] = useState<number[]>([]);
  const [totalPageItems, setTotalPageItems] = useState<number[][]>([]);

  // 페이지 넘기는 로직
  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageItems(totalPageItems[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageItems(totalPageItems[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  // 최대 페이지 갯수 정하기 : 페이지네이션 배열 만들기
  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageItems(slicedPageArray);
    setCurrentPageItems(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <Container>
      {/* <Icon
        src="/icon/icon_arrow_doubbleleft_gray.png"
        onClick={() => setPage(page - limit)}
        aria-disabled={page === 1}
      /> */}
      <button disabled={page === 1}>
        <Icon
          src="/icon/icon_arrow_left_gray.png"
          onClick={() => setPage(page - 1)}
        />
      </button>
      <Wrap>
        {currentPageItems?.map((idx) => (
          <PagiBtn
            $active={idx + 1 === page}
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            aria-current={page === idx + 1 ? "page" : null}
          >
            {idx + 1}
          </PagiBtn>
        ))}
      </Wrap>

      <button disabled={page === totalPage}>
        <Icon
          src="/icon/icon_arrow_right_gray.png"
          onClick={() => setPage(page + 1)}
          aria-disabled={page === totalPage}
        />
      </button>
      {/* <Icon
        src="/icon/icon_arrow_doubbleright_gray.png"
        onClick={() => setPage(page + limit)}
        aria-disabled={page === totalPage}
      /> */}
    </Container>
  );
};

export default index;
