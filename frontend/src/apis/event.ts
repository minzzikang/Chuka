import { BASE_URL, authRequest } from "@utils/requestMethods";
import axios from "axios";

// 이벤트 등록
export const createEventReg = async (formdata: any) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`/${BASE_URL}/events`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string): Promise<any> => {
  try {
    const response = await axios.get(`/${BASE_URL}/events/${eventId}`);
    console.log("이벤트 정보 : ", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }

  // return axios.get(`/domain/events/${eventId}`).then((res) => {
  //   console.log("이벤트 정보", res.data);
  //   return res.data;
  // });
};

// 내 이벤트 조회
export const fetchMyEventList = async (
  page: number,
  size: number,
  participant: boolean
) => {
  try {
    const response = await axios.get(`/${BASE_URL}/events/me`, {
      params: {
        page,
        size,
        participant,
      },
    });
    console.log("내 이벤트", response.data);
  } catch (err) {
    console.error(err);
  }
};
