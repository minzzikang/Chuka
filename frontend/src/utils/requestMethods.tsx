import axios from 'axios'

export const BASE_URL = 'https://chuka.kr/api/v1'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const authRequest = axios.create({
    baseURL: BASE_URL,
})