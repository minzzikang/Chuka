import axios, { AxiosResponse } from "axios";
import { refresh } from "./auth";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 이벤트 등록
export const createEventReg = async (formdata: any): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.post(
      `${url}/events`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
    // 유효성 검사 예외처리
  } catch (e: any) {
    if (e.response.status === 413) {
      alert("이미지 용량은 20MB 이하만 가능합니다.");
      return;
    } else if (e.response.status === 415) {
      alert("지원하지 않는 확장자입니다.(jpg,png,jpeg,gif 만 가능)");
      return;
    } else if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return createEventReg(formdata);
    }
  }
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string): Promise<any> => {
  try {
    const response = await axios.get(`${url}/events/${eventId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 이벤트, 축하메시지 갯수 조회
export const fetchCount = async () => {
  try {
    const response = await axios.get(`${url}/events/count`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 이벤트 목록 조회
export const fetchList = async (sort: string, page: number, size: number) => {
  try {
    const response: AxiosResponse = await axios.get(`${url}/events`, {
      params: {
        sort,
        page,
        size,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 내 이벤트 조회
export const fetchMyEventList = async ({
  sort,
  page,
  size,
  word,
}: {
  sort?: string;
  page: number;
  size: number;
  word?: string;
}): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${url}/events/me`, {
      params: {
        sort,
        page,
        size,
        word,
      },
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return fetchMyEventList({ sort, page, size, word });
    } else {
      console.error(e);
    }
  }
};

// 이벤트 삭제
export const deleteEvent = async (eventId: number): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.delete(
      `${url}/events/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return deleteEvent(eventId);
    } else {
      console.error(e);
    }
  }
};
