import { authRequest } from "@/utils/requestMethods";

const url = '/api/v1/reviews'

// 리뷰 작성

export const createReview = async (params:object) : Promise<any> => {
    authRequest
        .post(`/reviews`, params)
        .then(res => {
            return res.data
        })
        .catch(error => console.error(error))
}


export const fetchReview = async () : Promise<any> => {
    authRequest
    .get(`/reviews`).then(res => {return res.data})
    .catch(error => console.error(error))

}