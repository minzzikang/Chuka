import { authRequest } from "@/utils/requestMethods";
import { error } from "console";

const url = '/api/v1/reviews'

// 리뷰 작성

export const createReview = async (params:object) => {
    authRequest
        .post(`${url}`, params)
        .then(res => {
            return res.data
        })
        .catch(error => console.error(error))
}