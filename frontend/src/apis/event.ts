import { authRequest } from "@utils/requestMethods";
import axios from "axios";

const accessToken = localStorage.getItem("access_token");

// 이벤트 등록
export const createEventReg = async (formdata: any) => {
  try {
    const response = await axios.post(`/domain/events`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    });
    console.log("이벤트 등록", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string) => {
  return axios
    .get(`/domain/events/${eventId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then((res) => {
      console.log("이벤트 정보", res.data);
      return res.data;
    });
};
