import styled from "styled-components";
import NotificationListItem from "./NotificationListItem";
import { notificationType } from "@/types/notificationType";
import { deleteNotification } from "@/apis/notification";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-bottom: 60px;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

interface NotificationProps {
  notifications: notificationType[];
  onDelete: (notificationId: string) => void;
}

const NotificationList = (props: NotificationProps) => {
  const { notifications, onDelete } = props;

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      onDelete(notificationId);
      alert("알림이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {notifications.length > 0 ? (
        notifications.map((item) => (
          <NotificationListItem
            key={item.notificationId}
            notificationId={item.notificationId}
            content={item.content}
            pageUri={item.pageUri}
            eventId={item.eventId}
            fundingId={item.fundingId}
            createDateTime={item.createDateTime}
            type={item.type}
            eventTitle={item.eventTitle}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p style={{ margin: "20px" }}>알림이 없습니다.</p>
      )}
    </Container>
  );
};

export default NotificationList;
