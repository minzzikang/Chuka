import { authRequest } from "@utils/requestMethods";
import axios from "axios";

const accessToken = localStorage.getItem("access_token");

// 이벤트 등록
export const createEventReg = async (data: FormData) => {
  return authRequest
    .post(`/domain/events`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      res.data;
      console.log(res);
    });
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string) => {
  return axios
    .get(`/domain/events${eventId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then((res) => {
      console.log("이벤트 정보", res.data);
      return res.data;
    });
};
