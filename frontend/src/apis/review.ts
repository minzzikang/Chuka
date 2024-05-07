import axios from "axios";
import { BASE_URL, authRequest } from "@utils/requestMethods";


// 리뷰 작성

export const createReview = async (params: object): Promise<any> => {
  axios
    .post(`${BASE_URL}/reviews`, params)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const fetchReview = async (): Promise<any> => {
  try {
    // Proxy LOCAL 연결 
    const response = await axios.get(`${BASE_URL}/reviews`);

    // 배포 서버 연결
    // const response = await axios.get("https://chuka.kr/api/v1/reviews");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
