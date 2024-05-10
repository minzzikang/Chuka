import axios from "axios";

const url = `/domain`;
// const url = `https://chuka.kr/api/v1`

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
