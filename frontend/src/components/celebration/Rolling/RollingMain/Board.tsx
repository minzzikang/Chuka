import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoll, fetchRollSheets } from "@/apis/roll";
import * as b from "./Board.styled";
import Modal from "@common/modal";
import useIntersect from "@/hooks/useIntersect";
import { formattingComment } from "@/utils/stringFormat";
import { calculateDay } from "@/utils/calculation";

interface RollSheetListProps {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
  shape: string;
  rollSheetId: string;
  userId: string | null;
}

interface BoardProps {
  theme: string;
  date: string;
}

const Board = (props: BoardProps) => {
  const navigate = useNavigate();
  const { theme, date } = props;

  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();

  const [rollingModalOpen, setRollingModalOpen] = useState<boolean>(false);

  const [rollSheetList, setRollSheetList] = useState<RollSheetListProps[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0); // 스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 상태
  const pageRef = useRef(null)
  const [loading, setLoading] = useState(false); // 로딩 성공
  const observerRef = useRef<IntersectionObserver>();

  // 롤링페이퍼 리스트 무한스크롤 불러오기
  const fetchMoreData = useCallback(async () => {
    if (loading || (totalCnt > 0 && rollSheetList.length >= totalCnt)) {
      // 로딩 중이거나 모든 데이터를 이미 로드한 경우 더 이상 데이터를 불러오지 않음
      return;
    }
    setLoading(true);
    try {
      const response = await fetchRollSheets(eventId, currentPage, 8);
      if (response) {
        setRollSheetList((prev) => [...prev, ...response.rollSheetList]);
        if (response.rollSheetList.length < 8) {
          observerRef.current?.disconnect(); // 마지막 페이지일 경우 옵저버 중단
        } else {
          setLoading(false);
          setCurrentPage((prevPage) => prevPage + 1); // 데이터 로드가 성공적이면 페이지 번호 증가
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [eventId, currentPage, loading, totalCnt, rollSheetList.length]);

  const onIntersect = useCallback(
    async (entry: any, observer: any) => {
      observer.unobserve(entry.target)
      if (entry.isIntersecting && !loading) {
        fetchMoreData();
      }
    },
    [fetchMoreData, loading]
  );

  const ref = useIntersect(onIntersect, {
    // root: null,
    rootMargin: "200px", 
    threshold: 0.1, 
  });

  const [selectedRoll, setSelectedRoll] = useState<RollSheetListProps>({
    userId: "",
    nickname: "",
    content: "",
    backgroundImageThumbnailUrl: "",
    backgroundColor: "",
    font: "",
    fontColor: "",
    shape: "",
    rollSheetId: "",
  });

  // 카드 디테일 모달 오픈
  const handleCardClick = async (rollId: string) => {
    try {
      const response = await fetchRoll(rollId);
      setSelectedRoll(response);
      setRollingModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("롤링페이퍼 상세조회에 실패했습니다.");
    }
  };

  // 블러처리 DDAY 계산
  const [isDDay, setIsDDay] = useState<boolean>(false);

  useEffect(() => {
    const isDDay = calculateDay(date);
    if (isDDay === "-DAY" || isDDay[0] === "+") {
      setIsDDay(true);
    }
  }, [date, isDDay]);

  return (
    <>
      <b.Container $theme={theme}>
        <b.CardWrap>
          <b.Card
            style={{ border: "3px solid #ff3b85" }}
            onClick={() => {
              navigate(`/celebrate/rolling/${eventId}/${pageUri}/write`);
            }}
          >
            <img src="/icon/icon_add.png" />
            <p style={{ marginTop: "10px", color: "#ff3b85" }}>롤링 페이퍼</p>
            <p style={{ marginTop: "5px", color: "#ff3b85" }}>작성하기</p>
          </b.Card>
          {rollSheetList.map((roll, index) => (
            <b.Card
              key={index}
              $bgColor={roll.backgroundColor}
              $font={roll.font}
              $fontColor={roll.fontColor}
              $bgImage={roll.backgroundImageThumbnailUrl}
              $shape={roll.shape}
              onClick={() => handleCardClick(roll.rollSheetId)}
            >
              <b.SMComment $active={isDDay}>
                {formattingComment(roll.content)}
              </b.SMComment>
              <p>From. {roll.nickname}</p>
            </b.Card>
          ))}
        </b.CardWrap>
        <b.Target ref={ref} >
          Loading more...
        </b.Target>
      </b.Container>
      {rollingModalOpen && selectedRoll && (
        <Modal
          name={selectedRoll.nickname}
          onClose={() => setRollingModalOpen(false)}
        >
          <b.DetailWrap
            $bgColor={selectedRoll.backgroundColor}
            $bgImage={selectedRoll.backgroundImageThumbnailUrl}
            $shape={selectedRoll.shape}
          >
            <b.CardDetail
              $font={selectedRoll.font}
              $fontColor={selectedRoll.fontColor}
              $shape={selectedRoll.shape}
            >
              <b.LGComment $active={isDDay}>{selectedRoll.content}</b.LGComment>
            </b.CardDetail>
          </b.DetailWrap>
        </Modal>
      )}
    </>
  );
};

export default Board;
