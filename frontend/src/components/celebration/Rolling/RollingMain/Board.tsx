import CorkBoard from "/img/img_rolling_theme_cork.jpg";
import BlackBoard from "/img/img_rolling_theme_board.jpg";
import Drawer from "@components/drawer";
import RModal from '@common/responsiveModal'
import FundingModal from './FundingModal'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { fetchEventInfo } from "@/apis/event";
import * as b from "./Board.styled";

const Board = () => {
  const navigate = useNavigate();
  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();

  const [values, setValues] = useState<{ theme: string }>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem('access_token')



  const goFunding = () => {
    sessionStorage.setItem('prevUrl', prevUrl)
    if (accessToken) {
      setDrawerOpen(!isDrawerOpen)
    } else {
      setIsModalOpen(true)
    }
  }

  useEffect(() => {
    const fetchInfo = async () => {
      if (typeof eventId === "string") {
        try {
          const eventInfo = await fetchEventInfo(eventId);
          console.log("이벤트get요청", eventInfo);
          setValues(eventInfo);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("eventId 이상");
      }
    };
    fetchInfo();
  }, [eventId]);

  const Theme = values
    ? values.theme === "CORK_BOARD"
      ? CorkBoard
      : BlackBoard
    : CorkBoard;

  return (
    <>
      <b.Container>
        <b.P>롤링페이퍼를 작성해주세요.</b.P>
        <b.RollingTheme src={Theme} alt="theme" />
        <b.Button onClick={goFunding}>
          선물펀딩확인하기
        </b.Button>
      </b.Container>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      { isModalOpen && (
        <RModal name={"선물 펀딩 서비스 이용 동의"} onClose={() => setIsModalOpen(false)}>
          <FundingModal setIsModalOpen={setIsModalOpen}  />
        </RModal>
      )}
    </>
  );
};

export default Board;
