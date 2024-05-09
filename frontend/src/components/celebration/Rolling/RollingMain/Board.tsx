import Drawer from "@components/drawer";
import RModal from "@common/homeResModal";
import FundingModal from "./FundingModal";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoll, fetchRollSheets } from "@/apis/roll";
import * as b from "./Board.styled";
import Modal from "@common/modal";
import useIntersect from "@/hooks/useIntersect";

interface RollingData {
  rollSheetList: RollingItem[];
  totalCnt: number;
}

interface RollingItem {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
  shape: string;
  rollSheetId: string;
}

interface BoardProps {
  eventId: number;
  theme: string;
}

const Board = (props: BoardProps) => {
  const { eventId, theme } = props;
  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem("access_token");
  const params = useParams<{ eventId?: string }>();
  const finalEventId =
    eventId === 0 ? params.eventId ?? "default" : eventId.toString();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [rollingModalOpen, setRollingModalOpen] = useState<boolean>(false);
  const [fundingModalOpen, setFundingModalOpen] = useState<boolean>(false);
  
  
  
  
  
  const [rolls, setRolls] = useState<RollingData>({
    rollSheetList: [],
    totalCnt: 0,
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);



  // 롤링페이퍼 리스트 불러오고 저장
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const RollList = await fetchRollSheets(finalEventId, currentPage, 6);
        if (RollList) {
          setRolls(RollList);
          setCurrentPage(currentPage + 1);
        }
        console.log('롤리스트', RollList);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    
  }, [finalEventId]);


  const handleIntersect = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
    if (entry.isIntersecting && !loading) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [finalEventId]);

  useIntersect(handleIntersect, {
    rootMargin: '200px',
    threshold: 0.1,
  });

  
  const [selectedRoll, setSelectedRoll] = useState<RollingItem>({
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

  // 펀딩 drawer 오픈
  const goFunding = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    console.log(rolls);
    if (accessToken) {
      setDrawerOpen(!isDrawerOpen);
    } else {
      setFundingModalOpen(true);
    }
  };

  // 무한 스크롤


  return (
    <>
      <b.Container $theme={theme}>
        {rolls.rollSheetList.length === 0 && (
          <b.P>롤링페이퍼를 작성해주세요.</b.P>
        )}
        <b.CardWrap>
          {rolls.rollSheetList.map((roll) => (
            <b.Card
              key={roll.rollSheetId}
              $bgColor={roll.backgroundColor}
              $font={roll.font}
              $fontColor={roll.fontColor}
              $bgImage={roll.backgroundImageThumbnailUrl}
              $shape={roll.shape}
              onClick={() => handleCardClick(roll.rollSheetId)}
            >
              <p>{roll.content}</p>
              <p>From. {roll.nickname}</p>
            </b.Card>
          ))}
        </b.CardWrap>
        {loading && <p ref={targetRef}>Loading...</p>}
        <b.RollingTheme $theme={theme} />
        <b.Button onClick={goFunding}>선물펀딩확인하기</b.Button>
        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      </b.Container>

      {rollingModalOpen && selectedRoll && (
        <Modal
          name={selectedRoll.nickname}
          onClose={() => setRollingModalOpen(false)}
        >
          <b.CardDetail
            $bgColor={selectedRoll.backgroundColor}
            $font={selectedRoll.font}
            $fontColor={selectedRoll.fontColor}
            $bgImage={selectedRoll.backgroundImageThumbnailUrl}
            $shape={selectedRoll.shape}
          >
            {selectedRoll.content}
          </b.CardDetail>
        </Modal>
      )}

      {fundingModalOpen && (
        <RModal
          name={"선물 펀딩 서비스 이용 동의"}
          onClose={() => setFundingModalOpen(false)}
        >
          <FundingModal setFundingModalOpen={setFundingModalOpen} />
        </RModal>
      )}
    </>
  );
};

export default Board;
