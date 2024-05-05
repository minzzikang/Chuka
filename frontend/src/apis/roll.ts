import axios from "axios";

// 롤링페이퍼 등록
export const createRollMsg = async (formdata: any, eventId: string) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.post(`/domain/events/${eventId}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    });
    console.log("롤링페이퍼 등록", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
