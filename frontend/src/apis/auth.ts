import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

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
    .then((res: any) => {
      const newToken = res.headers["authorization"];
      localStorage.setItem("access_token", newToken);
      return newToken;
    })
    .catch((e: any) => {
      if (e.response.status === 401) {
        console.log("401 에러 뜸~~");
        alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.replace("https://chuka.kr/login");
      } else {
        console.log("에러", e);
        throw e;
      }
    });
};

// 회원 정보 조회(내정보)
export const fetchUserInfo = async (): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.get(`${url}/users/me`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return fetchUserInfo();
    } else {
      console.error(e);
      throw e;
    }
  }
};

// FCM 기기 토큰 전송
export const sendFCMToken = async (fcmToken: string): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.post(
      `${url}/users/fcm-token`,
      { fcmToken },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (e: any) {
    console.log('fcm토큰 에러 로그 데이터: ', e.response.status, e.response.data)
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return sendFCMToken(fcmToken);
    } else {
      console.error(e);
      throw e;
    }
  }
};

// 로그아웃
export const logout = async (): Promise<any> => {
  let accessToken = localStorage.getItem("access_token");
  try {
    const response: AxiosResponse = await axios.post(
      `${url}/users/logout`,
      {},
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response;
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data === "EXPIRED") {
      await refresh();
      return logout();
    } else {
      console.error(e);
      throw e;
    }
  }
};
