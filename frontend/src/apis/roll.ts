import axios from "axios";
import { BASE_URL, authRequest } from "@utils/requestMethods";

const url = '/domain'

// 롤링페이퍼 등록
export const createRollMsg = async (formdata: any, eventId: string) => {
  try {
    const response = await axios.post(
      `${url}/events/${eventId}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("롤링페이퍼 등록", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 롤링페이퍼 리스트 조회
export const fetchRollSheets = async (
  eventId: string,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(
      `${url}/events/${eventId}/roll-sheets`,
      {
        params: {
          page,
          size,
        },
      }
    );
    console.log("리스트 정보", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
