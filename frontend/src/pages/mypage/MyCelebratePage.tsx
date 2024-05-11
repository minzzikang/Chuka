import Header from "@common/header";
import Navbar from "@common/navbar";
import Search from "@components/search";
import EventNull from "@components/mypage/EventNull";
import Event from "@components/mypage/Event";
import SearchResult from "@components/search/SearchResult";
import { IoIosSearch } from "react-icons/io";
import { fetchMyEventList } from "@/apis/event";
import { useEffect, useState } from "react";
import { EventDataType } from "@/types/rollingType";

const MyCelebratePage = () => {
  // 검색
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<EventDataType>({
    totalCnt: 0,
    eventList: [],
  });

  const handleSearchClose = (result: EventDataType | null) => {
    setIsSearchOpen(false);
    if (result) {
      setSearchResults(result);
      console.log("searchResults.............", searchResults);
    } else {
      setSearchResults({ totalCnt: 0, eventList: [] });
    }
  };

  // 이벤트 조회 페이지네이션
  const [regPage, setRegPage] = useState(1);
  const [partPage, setPartPage] = useState(1);
  const [registeredEvents, setRegisteredEvents] = useState<EventDataType>({
    totalCnt: 0,
    eventList: [],
  });
  const [participatedEvents, setParticipatedEvents] = useState<EventDataType>({
    totalCnt: 0,
    eventList: [],
  });

  useEffect(() => {
    const fetchRegEvents = async () => {
      try {
        const response = await fetchMyEventList({ page: regPage - 1, size: 3 });
        setRegisteredEvents(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRegEvents();

    const fetchParticipantEvents = async () => {
      try {
        const response = await fetchMyEventList({
          sort: "participant",
          page: partPage - 1,
          size: 3,
        });
        setParticipatedEvents(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchParticipantEvents();
  }, [regPage, partPage]);

  useEffect(() => {
    console.log("전달받은 검색결과", searchResults);
  }, [searchResults]);

  return (
    <div
      style={{
        paddingBottom: "80px", // 네비게이션 바 높이만큼 패딩 추가
        minHeight: "100vh", // 화면의 전체 높이를 채우도록 설정
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isSearchOpen && (
        <Search setIsSearchOpen={setIsSearchOpen} onClose={handleSearchClose} />
      )}
      <Header icon={<IoIosSearch />} onIconClick={() => setIsSearchOpen(true)}>
        {"나의 ㅊㅋ"}
      </Header>
      {searchResults.totalCnt !== 0 ? (
        <SearchResult result={searchResults} />
      ) : (
        <>
          {registeredEvents.totalCnt === 0 ||
          participatedEvents.totalCnt === 0 ? (
            <EventNull />
          ) : (
            <>
              <Event
                key="registerEvent"
                eventList={registeredEvents}
                title="내가 등록한 ㅊㅋ"
                currentPage={regPage}
                setCurrentPage={setRegPage}
              />
              <Event
                key="participantEvent"
                eventList={participatedEvents}
                title="내가 참여한 ㅊㅋ"
                currentPage={partPage}
                setCurrentPage={setPartPage}
              />
            </>
          )}
        </>
      )}
      <Navbar current="mypage" />
    </div>
  );
};

export default MyCelebratePage;
