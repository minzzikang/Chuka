import Drawer from "@components/drawer";
import RModal from "@common/responsiveModal";
import FundingModal from "./FundingModal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { fetchRollSheets } from "@/apis/roll";
import * as b from "./Board.styled";

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

interface BoardProps {
  eventId: number;
  theme: string;
}

const Board = (props: BoardProps) => {
  const params = useParams<{ eventId?: string }>();

  const { eventId, theme } = props;

  const finalEventId =
    eventId === 0 ? params.eventId ?? "default" : eventId.toString();

  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rolls, setRolls] = useState<MessageProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem("access_token");

  const goFunding = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    if (accessToken) {
      setDrawerOpen(!isDrawerOpen);
    } else {
      setIsModalOpen(true);
    }
  };

  // 무한 스크롤 데이터 불러오기
  const loadMore = async () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 400
    ) {
      setLoading(true);
      try {
        const newRollList = await fetchRollSheets(
          // values.eventId.toString(),
          finalEventId,
          currentPage,
          6
        );
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
    const fetchData = async () => {
      // if (typeof eventId === "number") {
      setLoading(true);

      try {
        const RollList = await fetchRollSheets(
          // values.eventId.toString(),
          finalEventId,
          currentPage,
          6
        );
        console.log("롤리스트", RollList);

        if (RollList && RollList.length > 0) {
          setRolls(RollList);
          setCurrentPage(currentPage + 1);
          console.log("curPage: ", currentPage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      // }
    };
    fetchData();

    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [finalEventId]);

  useEffect(() => {
    console.log("Updated rolls:", rolls);
  }, [rolls]);

  return (
    <>
      <b.Container>
        {rolls.length === 0 && <b.P>롤링페이퍼를 작성해주세요.</b.P>}
        <b.CardWrap>
          {rolls.map((roll) => (
            <b.Card
              key={roll.rollSheetId}
              $bgColor={roll.backgroundColor}
              $font={roll.font}
              $fontColor={roll.fontColor}
              $bgImage={roll.backgroundImageThumbnailUrl}
              $shape={roll.shape}
              onClick={() => navigate(`/`)}
            >
              <p>{roll.content}</p>
              <p>From. {roll.nickname}</p>
            </b.Card>
          ))}
        </b.CardWrap>
        <b.RollingTheme $theme={theme} />
        <b.Button onClick={goFunding}>선물펀딩확인하기</b.Button>
      </b.Container>

      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />

      {isModalOpen && (
        <RModal
          name={"선물 펀딩 서비스 이용 동의"}
          onClose={() => setIsModalOpen(false)}
        >
          <FundingModal setIsModalOpen={setIsModalOpen} />
        </RModal>
      )}
    </>
  );
};

export default Board;
