import axios from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";


// 리뷰 작성
export const createReview = async (params: object): Promise<any> => {
  axios
    .post(`${url}/reviews`, params)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const fetchReview = async (): Promise<any> => {
  try {
    // Proxy LOCAL 연결 
    // const response = await axios.get(`${url}/reviews`);

    // 배포 서버 연결
    const response = await axios.get("https://chuka.kr/api/v1/reviews");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
