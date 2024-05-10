import styled from "styled-components";
import { colors } from "@styles/theme";
import SearchForm from "@/components/search/SearchForm";
import Navbar from "@common/navbar";
import RecentTerm from "@components/search/RecentTerm";
import SearchResult from "@components/search/SearchResult";
import { KeyboardEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { keywordState } from "@stores/search";
import { deleteBlank } from "@/utils/stringFormat";
import { EventDataType } from "@/types/rollingType";
import { fetchMyEventList } from "@/apis/event";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding: 5px;
  height: 100dvh;
`;

const SearchPage = () => {
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [result, setResult] = useState<EventDataType>({
    totalCnt: 0,
    eventList: [],
  });

  useEffect(() => {
    if (keyword !== "") {
      addRecentTerm(keyword);
      fetchMyEventList({ page: 0, size: 5 }).then((res) => {
        setResult(res);
      });
      setValue(keyword);
    }
  }, [keyword]);

  // 검색
  const onSearch = async (value: string, e: KeyboardEvent<Element>) => {
    if (e.key === "Enter") {
      setKeyword(value);
      addRecentTerm(value);
      const fetchData = await fetchMyEventList({
        page: 0,
        size: result.totalCnt,
      });
      const filterData = {
        totalCnt: fetchData.eventList.filter((event: any) =>
          event.title.includes(value)
        ).length,
        eventList: fetchData.eventList.filter((event: any) =>
          event.title.includes(value)
        ),
      };
      setResult(filterData);
    }
  };

  // 검색어 reset
  const resetKeyword = () => {
    setValue("");
    setKeyword("");
    setResult({ totalCnt: 0, eventList: [] });
  };

  // 최근 검색어 localstorage 저장
  const addRecentTerm = (term: string) => {
    let prev: string[] = JSON.parse(localStorage.getItem("recentTerm") || "[]");

    term = deleteBlank(term);
    prev = prev.filter((item) => item !== term);
    prev.unshift(term);
    prev.length > 10 && prev.pop();
    localStorage.setItem("recentTerm", JSON.stringify(prev));
  };

  return (
    <Container>
      <SearchForm
        value={value}
        setValue={setValue}
        onSearch={onSearch}
        resetKeyword={resetKeyword}
      />
      {keyword === "" ? <RecentTerm /> : <SearchResult result={result} />}
      <Navbar current="mypage" />
    </Container>
  );
};

export default SearchPage;
