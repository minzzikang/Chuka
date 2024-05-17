import { useEffect, useState } from "react";
import * as p from "./Pagination.styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export type PaginationType = {
  totalPage: number; // 전체 페이지 갯수
  limit: number; // 한번에 보여줄 pagination 갯수
  page: number; // 현재 페이지 번호
  setPage: (page: number) => void;
};

export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = Array.from({ length: totalPage }, (_, i) => i);
  return Array.from({ length: Math.ceil(totalPage / limit) }, () =>
    totalPageArray.splice(0, limit)
  );
};

const index = (props: PaginationType) => {
  // 전체 페이지네이션 갯수, 한 사이클의 페이지네이션 제한 갯수 , 현재 페이지, 현재 페이지 이동
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
  }, [totalPage, limit]);

  return (
    <p.Container>
      <button disabled={page === 1}>
        <IoIosArrowBack onClick={() => setPage(page - 1)} />
      </button>
      <p.Wrap>
        {currentPageItems?.map((idx) => (
          <p.PagiBtn
            $active={idx + 1 === page}
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            aria-current={page === idx + 1 ? "page" : null}
          >
            {idx + 1}
          </p.PagiBtn>
        ))}
      </p.Wrap>

      <button disabled={page === totalPage}>
        <IoIosArrowForward
          onClick={() => setPage(page + 1)}
          aria-disabled={page === totalPage}
        />
      </button>
    </p.Container>
  );
};

export default index;
