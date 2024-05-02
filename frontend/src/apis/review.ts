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
  axios
    .get("/domain/reviews", {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then((res) => {
      console.log("review", res.data);
      return res.data;
    })
    .catch((error) => console.error(error));
};
