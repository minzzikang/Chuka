import { authRequest, publicRequest } from "@utils/requestMethods";

const JWT_EXPIRY_TIME = 3600 * 1000;

export const refresh = async () => {
  return authRequest
    .post("/auth/reissue")
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
export const fetchUserInfo = async () => {
  return authRequest
    .get("/users/me")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
