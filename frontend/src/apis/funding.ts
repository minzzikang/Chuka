import { RegDataType } from "@/components/funding/FundingRegInfo";
import axios from "axios";

const url = `domain`;
// const url = `https://chuka.kr/api/v1`

export const createFunding = async (params: RegDataType) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`/domain/fundings`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    })
    // console.log("전전전전전전전전전",response.data);
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  } 
    
};

export const createReview = async (params: object): Promise<any> => {
  axios
    .post("/domain/reviews", params)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const fetchReview = async (): Promise<any> => {
  try {
    // Proxy LOCAL 연결
    const response = await axios.get("/domain/reviews");

    // 배포 서버 연결
    // const response = await axios.get("https://chuka.kr/api/v1/reviews");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
