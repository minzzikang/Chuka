import { authRequest } from "@utils/requestMethods";
import { userType } from "@/types/authType";

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

// 회원 정보 조회
// export const fetchUserInfo = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });
//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//     throw new Error("회원정보 불러오기 실패");
//   }
// };
