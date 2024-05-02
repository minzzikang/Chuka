import axios from "axios";

export const BASE_URL = 'https://chuka.kr'
// export const BASE_URL = "http://localhost:5000";

export const authRequest = axios.create({
  baseURL: BASE_URL,
});
