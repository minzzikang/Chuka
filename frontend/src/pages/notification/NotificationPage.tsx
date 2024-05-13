import { useEffect, useState } from "react";
import Navbar from "@common/navbar";
import NotificationList from "@/components/notification/NotificationList";
import Header from "@common/header";
import RModal from "@common/homeResModal";
import { useNavigate } from "react-router-dom";
import NotificationModal from "./NotificationModal";
import { notificationType } from "@/types/notificationType";
import { deleteAllNotification, fetchNotifications } from "@/apis/notification";

const NotificationPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<notificationType[]>([]);

  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotifications();
        setNotifications(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotification();
      alert("알림이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    const updateNotifications = notifications.filter(
      (noti) => noti.notificationId !== notificationId
    );
    setNotifications(updateNotifications);
  };

  return (
    <div>
      <Header>{"알림"}</Header>
      <p
        style={{
          position: "fixed",
          top: "15px",
          right: "10px",
          color: "#959db1",
        }}
        onClick={handleDeleteAll}
      >
        전체 삭제
      </p>
      <NotificationList
        notifications={notifications}
        onDelete={handleDeleteNotification}
      />
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
