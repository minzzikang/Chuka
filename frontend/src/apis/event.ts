import axios, { AxiosResponse } from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";
const accessToken = localStorage.getItem("access_token");

// 이벤트 등록
export const createEventReg = async (formdata: any) => {
  try {
    const response: AxiosResponse = await axios
      .post(`${url}/events`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `${accessToken}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM0NTI2NTk1NDMiLCJuaWNrbmFtZSI6Iuuwle2DnO2YuCIsInJvbGUiOiJST0xFX1VTRVIiLCJ0eXBlIjoiQVRLIiwiaWF0IjoxNzE1MDU1MzgwLCJleHAiOjE3MTUzMTQ1ODB9.yuwt2nCDD2VEkvJm1ZB-aFNfkFEFON8EeXYjJN6YlLI`,
        },
      })
      .then((res) => {
        return res.data;
      })
      // 유효성 검사 예외처리
      .catch((e:any) => {
        if (e.response.status === 413) {
          alert("이미지 용량은 20MB 이하만 가능합니다.");
          return;
        } else if (e.response.status === 415) {
          alert("지원하지 않는 확장자입니다.(jpg,png,jpeg,gif,webp 만 가능)");
          return;
        } else if (e.response.status === 401) {
          console.log('data', e.response.data)
          console.log('body', e.response.body)
        } 
      });
  } catch (err) {
    console.error(err);
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
    const response = await axios.get(`${url}/events`, {
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
}) => {
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
    console.log("내 이벤트", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 이벤트 삭제
export const deleteEvent = async (eventId: number) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(`${url}/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
