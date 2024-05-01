import { authRequest } from "@utils/requestMethods";

const url = "/events";

// 이벤트 등록
export const createEventReg = async (data: FormData) => {
  return authRequest
    .post(`${url}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      res.data;
      console.log(res);
    });
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string) => {
  return authRequest.get(`${url}/${eventId}`).then((res) => res.data);
};
