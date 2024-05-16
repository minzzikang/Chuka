import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoll, fetchRollSheets } from "@/apis/roll";
import { IoIosAddCircle } from "react-icons/io";
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
    (entry: any, observer: any) => {
      if (entry.isIntersecting && !loading) {
        fetchMoreData();
      }
    },
    [fetchMoreData, loading]
  );

  const ref = useIntersect(onIntersect, {
    threshold: 0.1, // 관찰하고자 하는 element가 어느정도 노출됐을 때 activate할 것인지 결정하는 옵션, 0이면 1px이라도 노출됐을 때 activate
    rootMargin: "200px", // 특정 요소에 닿았을 때 isIntersecting이 true가 될텐데, 관찰하고자 하는 element의 크기를 넘어서서 200px 전부터 체킹하고 싶다.
    // root: null, // root는 default가 null 이다. 이 때, 특정 div 내에서 scroll을 하고 싶은거라면 root에 특정 element 값을 넣어주면 된다. ex)  document.querySelector('#scrollArea')
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
            <IoIosAddCircle color="#ff3b85" size={30} />
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
        <div ref={ref} style={{ color: "transparent" }}>
          Loading more...
        </div>
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
