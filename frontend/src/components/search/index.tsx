import * as s from "./Search.styled";
import SearchForm from "@/components/search/SearchForm";
import Navbar from "@common/navbar";
import RecentTerm from "@components/search/RecentTerm";
import SearchResult from "@components/search/SearchResult";
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { keywordState } from "@stores/search";
import { deleteBlank } from "@utils/stringFormat";
import { EventDataType } from "@/types/rollingType";
import { fetchMyEventList } from "@/apis/event";

interface SearchProps {
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  onClose: (results: EventDataType | null) => void;
}

const index = (props: SearchProps) => {
  const { setIsSearchOpen, onClose } = props;

  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [result, setResult] = useState<EventDataType>({
    totalCnt: 0,
    eventList: [],
  });

  // 모달 백드롭
  const modalRef = useRef<HTMLDivElement>(null);
  const handleBackdrop = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBackdrop);
    return () => {
      document.removeEventListener("mousedown", handleBackdrop);
    };
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      addRecentTerm(keyword);
      fetchMyEventList({ page: 0, size: 5, word: keyword }).then((res) => {
        setResult(res);
      });
      setValue(keyword);
    }
  }, [keyword]);

  // 검색
  const onSearch = async (value: string, e: KeyboardEvent<Element>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setKeyword(value);
      addRecentTerm(value);
      try {
        const fetchData = await fetchMyEventList({
          page: 0,
          size: result.totalCnt,
          word: value,
        });
        setResult(fetchData);
        setIsSearchOpen(false);
        onClose(fetchData);
      } catch (err) {
        console.log(err);
        onClose(null);
      }
    }
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
    <s.BackDrop>
      <s.Container ref={modalRef}>
        <s.Xbutton>
          <img
            src="/icon/icon_close_black.png"
            alt=""
            onClick={() => setIsSearchOpen(false)}
          />
        </s.Xbutton>
        <SearchForm value={value} setValue={setValue} onSearch={onSearch} />
        {keyword === "" ? <RecentTerm /> : <SearchResult result={result} />}
        <Navbar current="mypage" />
      </s.Container>
    </s.BackDrop>
  );
};

export default index;
