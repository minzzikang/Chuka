import Header from "@common/header";
import SearchBar from "@/components/searchBar";
import Navbar from "@common/navbar";
import EventNull from "@components/mypage/EventNull";
import Event from "@components/mypage/Event";
import { fetchMyEventList } from "@/apis/event";
import { useEffect, useState } from "react";
import { EventDataType } from "@/types/rollingType";

const MyCelebratePage = () => {
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
        console.log("참여한이벤트: ", registeredEvents);
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
        // console.log("등록한 이벤트: ", participatedEvents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchParticipantEvents();
  }, [regPage, partPage]);

  return (
    <div
      style={{
        paddingBottom: "80px", // 네비게이션 바 높이만큼 패딩 추가
        minHeight: "100vh", // 화면의 전체 높이를 채우도록 설정
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header children="나의 ㅊㅋ" />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <SearchBar />
      </div>
      {registeredEvents.totalCnt === 0 || participatedEvents.totalCnt === 0 ? (
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
      <Navbar current="mypage" />
    </div>
  );
};

export default MyCelebratePage;
