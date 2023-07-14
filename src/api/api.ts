import axios from "axios";
import TokenService from "../services/TokenSerivce";

export const authInstance = axios.create({
  baseURL: "http://13.124.181.25",
});
authInstance.interceptors.request.use(async (config) => {
  let tokenType: "user" | "guest";

  // 로직을 추가하여 토큰 타입을 결정
  // 예: 비회원 토큰이 있는지 확인 후, 없으면 회원 토큰을 사용
  const userToken = await TokenService.getToken("user");
  if (userToken) {
    tokenType = "user";
  } else {
    tokenType = "guest";
  }

  const token = await TokenService.getToken(tokenType);
  config.headers.Authorization = token;

  return config;
});
