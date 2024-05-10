import { useState } from "react";
import Navbar from "@common/navbar";
import NotificationList from "@/components/notification/NotificationList";
import Header from "@common/header";
import RModal from "@common/homeResModal";
import { useNavigate } from "react-router-dom";
import NotificationModal from "./NotificationModal";

const NotificationPage = () => {
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
      <NotificationList />
      <Navbar current="notification" />
      {!accessToken && (
        <RModal name={"알림 서비스 동의"} onClose={handleCancel}>
          <NotificationModal />
        </RModal>
      )}
    </div>
  );
};

export default NotificationPage;
