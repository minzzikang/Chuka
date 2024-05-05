import Navbar from "@common/navbar";
import Header from "@common/header";
import Celebration from "@components/celebration";
import RModal from '@common/responsiveModal'
import CelebrationModal from './CelebrationModal'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CelebrationPage = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const accessToken = localStorage.getItem('access_token')
  const navigate = useNavigate()

  const handleCancel = () => {
      setIsOpen(false)
      navigate('/')
  }
  return (
    <>
      <Header children="축하 등록하기" />
      <Celebration />
      <Navbar current="celebration" />
      {!accessToken && (
        <RModal name={"이벤트 등록 이용 동의"} onClose={handleCancel}>
          <CelebrationModal />
        </RModal>
      )}
    </>
  );
};

export default CelebrationPage;
