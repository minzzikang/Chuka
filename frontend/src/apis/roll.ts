import axios from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 롤링페이퍼 등록
export const createRollMsg = async (formdata: any, eventId: string) => {
  try {
    const response = await axios.post(`${url}/events/${eventId}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("롤링페이퍼 등록", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 롤링페이퍼 리스트 조회
export const fetchRollSheets = async (
  eventId: string | undefined,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(`${url}/events/${eventId}/roll-sheets`, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 롤링페이퍼 단건 조회
export const fetchRoll = async (rollSheetId: string) => {
  try {
    const response = await axios.get(
      `${url}/events/roll-sheets/${rollSheetId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 롤링페이퍼 단건 삭제
export const deleteRoll = async (rollSheetId: string) => {
  const accessToken = localStorage.getItem("acess_token");
  try {
    const response = await axios.delete(
      `${url}/events/roll-sheets/${rollSheetId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
