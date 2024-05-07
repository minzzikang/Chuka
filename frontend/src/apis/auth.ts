import { authRequest } from "@utils/requestMethods";
import { userType } from "@/types/authType";
import axios from "axios";

const JWT_EXPIRY_TIME = 3600 * 1000;

// 리프레시 토큰 요청
export const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return authRequest
    .post(
      "/auth/reissue",
      {},
      {
        headers: {
          Refresh: refreshToken,
        },
      }
    )
    .then((res) => loginSuccess(res.data))
    .catch((err) => console.log(err));
};

// 로그인 성공 시
export const loginSuccess = async (res: { accessToken: string }) => {
  const { accessToken } = res;

  authRequest.defaults.headers.Authorization = `Bearer ${accessToken}`;
  setTimeout(() => refresh(), JWT_EXPIRY_TIME - 5000);
};

// 회원 정보 조회(내정보)
export const fetchUserInfo = () => {
  const accessToken = localStorage.getItem("access_token");
  console.log("로컬 토큰", accessToken);
  return axios
    .get("/domain/users/me", {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then((res) => {
      console.log("get 요청 데이터", res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};


// FCM 기기 토큰 전송
export const sendFCMToken = async (fcmToken: string) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`https://chuka.kr/api/v1/users/fcm-token`, fcmToken, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
