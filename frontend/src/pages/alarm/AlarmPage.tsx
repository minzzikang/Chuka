import { useState } from "react";
import Navbar from "@common/navbar";
import AlarmList from "@/components/alarm/AlarmList";
import Header from "@common/header";
import RModal from "@common/homeResModal";
import { useNavigate } from "react-router-dom";
import AlarmModal from "./AlarmModal";

const AlarmPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div>
      <Header children={"알림"} />

      <AlarmList />
      <Navbar current="alarm" />
      {!accessToken && (
        <RModal name={"알림 서비스 동의"} onClose={handleCancel}>
          <AlarmModal />
        </RModal>
      )}
    </div>
  );
};

export default AlarmPage;
