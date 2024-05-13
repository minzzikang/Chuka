import axios from "axios";

const url = `https://chuka.kr/api/v1`;
const local = "/domain";

// 리프레시 토큰 요청
export const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return axios
    .post(
      `${url}/auth/reissue`,
      {},
      {
        headers: {
          Authorization: `${refreshToken}`,
        },
      }
    )
    .then((res) => {
      const newToken = res.headers["authorization"];
      localStorage.setItem("access_token", newToken);
    })
    .catch((err) => console.log(err));
};

// 회원 정보 조회(내정보)
export const fetchUserInfo = () => {
  const accessToken = localStorage.getItem("access_token");
  return axios
    .get(`${url}/users/me`, {
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
    const response = await axios.post(
      `${url}/users/fcm-token`,
      { fcmToken },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 로그아웃
export const logout = async () => {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(
    `${url}/users/logout`,
    {},
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
  return response;
};
