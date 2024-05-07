import { RegDataType } from "@/components/funding/FundingRegInfo";
import axios from "axios";

const url = `domain`;
// const url = `https://chuka.kr/api/v1`

// 펀딩 생성
export const createFunding = async (params: RegDataType) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`/domain/fundings`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    })
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  } 
};

// 이벤트에 해당하는 펀딩 목록 조회
export const fetchFundings = async (eventId:string) => {
  try {
    const response = await axios.get(`/domain/fundings/events/${eventId}`)
    console.log('펀딩 목록 조회',response.data);
    return response.data
  } catch (err) {
    console.error(err);
    throw err
  }
}

