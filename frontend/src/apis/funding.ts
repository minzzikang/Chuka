import { RegDataType } from "@/components/funding/FundingRegInfo";
import { PayDataType } from "@/components/payment/index.tsx";
import axios, { AxiosResponse } from "axios";

const accessToken = localStorage.getItem("access_token");
const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 펀딩 생성
export const createFunding = async (params: RegDataType) => {
  try {
    const response:AxiosResponse = await axios
      .post(`${url}/fundings`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        if (e.response.status === 401) {
          alert('이건 무슨 에러죠?')
        } else if (e.response.status === 404) {
          alert("입력이 누락된 곳이 있는지 살펴봐주세요");
        }
      })
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 이벤트에 해당하는 펀딩 목록 조회
export const fetchFundings = async (eventId: string) => {
  try {
    const response = await axios.get(`${url}/fundings/events/${eventId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 나의 펀딩 조회
export const fetchMyFundings = async () => {
  try {
    const response = await axios.get(`${url}/fundings/me`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 펀딩 단건 조회
export const fetchFunding = async (fundingId: number) => {
  try {
    const response = await axios.get(`${url}/fundings/${fundingId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 펀딩 참여
export const joinFunding = async (fundingId: number, params: PayDataType) => {
  try {
    const response = await axios.post(`${url}/fundings/${fundingId}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 펀딩 삭제
export const deleteFunding = async (fundingId: number) => {
  try {
    const response = await axios.delete(`${url}/fundings/${fundingId}`, {
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
