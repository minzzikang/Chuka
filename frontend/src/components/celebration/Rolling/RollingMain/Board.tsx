import CorkBoard from "/img/img_rolling_theme_cork.jpg";
import BlackBoard from "/img/img_rolling_theme_board.jpg";
import Drawer from "@components/drawer";
import RModal from "@common/responsiveModal";
import FundingModal from "./FundingModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  const { eventId, theme } = props;
  const [values, setValues] = useState<BoardProps>({
    eventId: eventId,
    theme: theme,
  });

  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rolls, setRolls] = useState<MessageProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem("access_token");

  const goFunding = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    console.log("여기에요 전 !!!!!!!!!!", values)
    console.log(values.eventId);
    if (accessToken) {
      setDrawerOpen(!isDrawerOpen);
    } else {
      setIsModalOpen(true);
    }
  };

  // 무한 스크롤 데이터 불러오기
  const loadMore = async () => {
    if (!loading) {
      setLoading(true);
      if (typeof values.eventId.toString() === "string") {
        try {
          const newRollList = await fetchRollSheets(
            values.eventId.toString(),
            currentPage + 1,
            10
          );
          if (newRollList && newRollList.length > 0) {
            setRolls([...rolls, ...newRollList]);
            setCurrentPage(currentPage + 1);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {

        try {
          const RollList = await fetchRollSheets(values.eventId.toString(), currentPage, 10);
          console.log("롤리스트", RollList);

          if (RollList && RollList.length > 0) {
            setRolls(RollList);
            setCurrentPage(currentPage + 1);
          }
          console.log("values", rolls);
        } catch (err) {
          console.error(err);
        }

    };
    fetchData();
  }, [eventId, currentPage]);

  useEffect(() => {
    console.log("Updated rolls:", rolls);
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [rolls]);

  const Theme = values
    ? values.theme === "CORK_BOARD"
      ? CorkBoard
      : BlackBoard
    : CorkBoard;

  return (
    <>
      <b.Container>
        {!rolls && <b.P>롤링페이퍼를 작성해주세요.</b.P>}
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
        <b.RollingTheme src={Theme} />
        <b.Button onClick={goFunding}>선물펀딩확인하기</b.Button>
      </b.Container>

      <Drawer
        isOpen={isDrawerOpen}
        // eventId={values?.eventId}
        onClose={() => setDrawerOpen(false)}
      />

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
