import CorkBoard from "/img/img_rolling_theme_cork.jpg";
import BlackBoard from "/img/img_rolling_theme_board.jpg";
import Drawer from "@components/drawer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchEventInfo } from "@/apis/event";
import * as b from "./Board.styled";

interface BoardProps {
  eventId: string;
}

const Board = ({ eventId }: BoardProps) => {
  const navigate = useNavigate();

  const [values, setValues] = useState<{ theme: string }>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const eventInfo = await fetchEventInfo(eventId);
        setValues(eventInfo);
        sessionStorage.setItem("eventId", eventId);
      } catch (err) {
        console.error(err);
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
        <b.Button onClick={() => setDrawerOpen(!isDrawerOpen)}>
          선물펀딩확인하기
        </b.Button>
      </b.Container>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Board;
