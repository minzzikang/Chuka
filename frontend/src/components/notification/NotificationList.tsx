import styled from "styled-components";
import NotificationListItem from "./NotificationListItem";
import { useEffect, useState } from "react";
import { notificationType } from "@/types/notificationType";
import { fetchNotifications } from "@/apis/notification";

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

  return (
    <Container>
      {values.length > 0 ? (
        values.map((item) => (
          <NotificationListItem
            key={item.notificationId}
            content={item.content}
            creationDateTime={item.creationDateTime}
            type={item.type}
          />
        ))
      ) : (
        <p>알림이 없습니다.</p>
      )}
    </Container>
  );
};

export default NotificationList;
