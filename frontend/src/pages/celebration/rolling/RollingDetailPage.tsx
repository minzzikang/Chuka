import Navbar from "@common/navbar";
import Header from "@common/header";
import DetailCard from "@/components/celebration/Rolling/RollingDetail";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchRollSheets } from "@/apis/roll";

interface MessageProps {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
  shape: string;
  rollSheetId: string;
}

const RollingDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const state = location.state;
  const stateEventId = state ? state.stateEventId : eventId;

  const [rolls, setRolls] = useState<MessageProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
    console.log(eventId);
  }, [currentPage]);

  // 무한 스크롤 데이터 불러오기
  const loadMore = async () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 30
    ) {
      setLoading(true);
      try {
        const newRollList = await fetchRollSheets(stateEventId, currentPage, 4);
        if (newRollList && newRollList.length > 0) {
          setRolls((prevRolls) => [...prevRolls, ...newRollList]);
          setCurrentPage(currentPage + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    // loadMore();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    loadMore(); // 초기 데이터 로드
  }, []);

  useEffect(() => {
    const fetchRolls = async () => {
      setLoading(true);
      try {
        const RollList = await fetchRollSheets(stateEventId, currentPage, 4);
        console.log("롤리스트", RollList);

        if (RollList && RollList.length > 0) {
          setRolls(RollList);
          setCurrentPage(currentPage + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRolls();
  }, [eventId]);

  useEffect(() => {
    console.log("Updated values:", rolls);
  }, [rolls]);

  return (
    <>
      <Header children="작성된 메시지" />
      {rolls.map((message) => (
        <DetailCard
          key={message.rollSheetId}
          nickname={message.nickname}
          content={message.content}
          backgroundImageThumbnailUrl={message.backgroundImageThumbnailUrl}
          backgroundColor={message.backgroundColor}
          font={message.font}
          fontColor={message.fontColor}
        />
      ))}
      <Navbar current={"celebration"} />
    </>
  );
};

export default RollingDetailPage;
