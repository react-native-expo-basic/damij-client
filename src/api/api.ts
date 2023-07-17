import axios from "axios";
import TokenService from "../services/TokenSerivce";

export const authInstance = axios.create({
  baseURL: "http://13.124.181.25",
});
authInstance.interceptors.request.use(async (config) => {
  let tokenType: "user" | "guest";

  // 회원의 토큰이 있는지 확인하고 없으면 게스트 토큰을 사용
  const userToken = await TokenService.getToken("user");
  if (userToken) {
    tokenType = "user";
    await TokenService.checkTokenExpiration(userToken);
  } else {
    tokenType = "guest";
  }

  const token = await TokenService.getToken(tokenType);
  config.headers.Authorization = token;

  return config;
});
