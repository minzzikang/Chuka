import axios from 'axios'

export const BASE_URL = 'https://chuka.kr/api/v1'

export const authRequest = axios.create({
    baseURL: BASE_URL,
})