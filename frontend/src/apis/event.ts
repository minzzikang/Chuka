import axios from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 이벤트 등록
export const createEventReg = async (formdata: any) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`${url}/events`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    });
    return response;
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
  const accessToken = localStorage.getItem("access_token");

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
