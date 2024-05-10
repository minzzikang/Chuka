import styled from "styled-components";
import NotificationListItem from "./NotificationListItem";
import { useEffect, useState } from "react";
import { notificationType } from "@/types/notificationType";
import { fetchNotifications } from "@/apis/notification";
import { deleteNotification } from "@/apis/notification";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

const NotificationList = () => {
  const [values, setValues] = useState<notificationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotifications();
        setValues(response);
        console.log("내알림", values);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      const updatedValues = values.filter(
        (item) => item.notificationId !== notificationId
      );
      setValues(updatedValues);
      alert("알림이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {values.length > 0 ? (
        values.map((item) => (
          <NotificationListItem
            key={item.notificationId}
            notificationId={item.notificationId}
            content={item.content}
            pageUri={item.pageUri}
            eventId={item.eventId}
            fundingId={item.fundingId}
            creationDateTime={item.creationDateTime}
            type={item.type}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p>알림이 없습니다.</p>
      )}
    </Container>
  );
};

export default NotificationList;
