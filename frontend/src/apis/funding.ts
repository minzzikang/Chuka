import { RegDataType } from "@/components/funding/FundingRegInfo";
import { PayDataType } from "@/components/payment/index.tsx";
import axios, { AxiosResponse } from "axios";
import { refresh } from "./auth";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 펀딩 생성
export const createFunding = async (params: RegDataType): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");

  try {
    const response: AxiosResponse = await axios.post(
      `${url}/fundings`,
      params,
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
      return createFunding(params);
    } else if (e.response.status === 404) {
      alert("해당하는 이벤트가 없습니다");
      return;
    }
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
export const fetchMyFundings = async (): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${url}/fundings/me`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return fetchMyFundings();
    } else {
      console.error(e);
    }
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
export const joinFunding = async (
  fundingId: number,
  params: PayDataType
): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");

  try {
    const response: AxiosResponse = await axios.post(
      `${url}/fundings/${fundingId}`,
      params,
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
      return joinFunding(fundingId, params);
    } else {
      console.error(e);
    }
  }
};

// 펀딩 삭제
export const deleteFunding = async (fundingId: number): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.delete(
      `${url}/fundings/${fundingId}`,
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
      return deleteFunding(fundingId);
    } else {
      console.error(e);
    }
  }
};
