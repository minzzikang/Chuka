export type notificationType = {
  notificationId: string;
  userId: string;
  content: string;
  createDateTime: string;
  eventId?: number;
  pageUri?: string;
  fundingId?: number;
  type: string;
  eventTitle?: string;
};
