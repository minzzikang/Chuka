import { authRequest } from "@utils/requestMethods";
import { userType } from "@/types/authType";
import axios from "axios";

const JWT_EXPIRY_TIME = 30 * 60 * 1000; //30분에 한 번

export const refresh = async () => {
  return authRequest
    .post(
      "/auth/reissue",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    )
    .then((res) => {
      const newToken = res.headers["authorization"];
      localStorage.setItem("access_token", newToken);
      authRequest.defaults.headers.common["Authorization"] =
        `Bearer ${newToken}`;
      console.log("new token", newToken);
    })
    .catch((err) => console.log(err));
};

// 로그인 성공 시
export const loginSuccess = async (res: {
  accessToken: string;
  refreshToken: string;
}) => {
  const { accessToken, refreshToken } = res;

  authRequest.defaults.headers["Authorization"] = accessToken;
  authRequest.defaults.headers["Refresh-Token"] = refreshToken;
  setTimeout(() => refresh(), JWT_EXPIRY_TIME);
};

// 회원 정보 조회
export const fetchUserInfo = async () => {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.get("https://chuka.kr/api/v1/users/me", {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  console.log("유저 정보", response.data);
  return response.data;
};
