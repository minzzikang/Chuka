import axios from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 알림 목록 조회
export const fetchNotifications = async () => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${url}/notifications`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 알림 단건 삭제
export const deleteNotification = async (notificationId: string) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `${url}/notifications/${notificationId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 알림 전체 삭제
export const deleteAllNotification = async () => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(`${url}/notifications`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
