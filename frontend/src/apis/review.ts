import { authRequest } from "@/utils/requestMethods";
import axios from "axios";

const accessToken = localStorage.getItem("access_token");

// 리뷰 작성

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
    // const response = await axios.get("/domain/reviews");

    // 배포 서버 연결
    const response = await axios.get("https://chuka.kr/api/v1/reviews");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
