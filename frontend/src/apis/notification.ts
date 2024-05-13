import axios, { AxiosResponse } from "axios";
import { refresh } from "./auth";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 알림 목록 조회
export const fetchNotifications = async (): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.get(`${url}/notifications`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return fetchNotifications();
    } else {
      console.error(e);
    }
  }
};

// 알림 단건 삭제
export const deleteNotification = async (
  notificationId: string
): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.delete(
      `${url}/notifications/${notificationId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return deleteNotification(notificationId);
    } else {
      console.error(e);
    }
  }
};

// 알림 전체 삭제
export const deleteAllNotification = async (): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.delete(`${url}/notifications`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return deleteAllNotification();
    } else {
      console.error(e);
    }
  }
};
