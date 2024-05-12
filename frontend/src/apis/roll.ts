import axios, { AxiosResponse } from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 롤링페이퍼 등록
export const createRollMsg = async (formdata: any, eventId: string) => {
  try {
    const response: AxiosResponse = await axios
      .post(`${local}/events/${eventId}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        return response.data;
      })
      // 유효성 검사 예외처리
      .catch((e) => {
        if (e.response.status === 413) {
          alert("이미지 용량은 20MB 이하만 가능합니다.");
          return;
        } else if (e.response.status === 415) {
          alert("지원하지 않는 확장자입니다.(jpg,png,jpeg,gif,webp 만 가능)");
          return;
        }
      });
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
