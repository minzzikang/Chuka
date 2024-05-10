export type notificationType = {
  notificationId: string;
  userId: string;
  content: string;
  creationDateTime: string;
  eventId?: number;
  pageUri?: string;
  fundingId?: number;
  type: string;
};
