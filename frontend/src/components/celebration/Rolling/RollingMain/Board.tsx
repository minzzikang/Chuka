import Theme from "/img/img_rolling_theme_cork.jpg";
import Drawer from "@components/drawer";
import { useState } from "react";
import * as b from "./Board.styled"

const Board = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
