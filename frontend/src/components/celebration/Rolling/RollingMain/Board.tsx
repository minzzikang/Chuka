import Theme from "/img/img_rolling_theme_cork.jpg";
import Drawer from "@components/drawer";
import { useState } from "react";
import * as b from "./Board.styled"
import { useNavigate } from "react-router-dom";
import RModal from '@common/responsiveModal'
import FundingModal from './FundingModal'

const Board = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const prevUrl = window.location.href;
  const accessToken = localStorage.getItem('access_token')

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  const goFunding = () => {
    sessionStorage.setItem('prevUrl', prevUrl)
    if (accessToken) {
      setDrawerOpen(!isDrawerOpen)
    } else {
      setIsModalOpen(true)
    }
  }

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
