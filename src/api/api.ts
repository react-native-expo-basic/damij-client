import axios from "axios";
import TokenService from "../services/TokenSerivce";
import { useSelector } from "react-redux";
import { fetchGuestToken } from "./userApi";

export const authInstance = axios.create({
  baseURL: "http://13.124.181.25",
});
authInstance.interceptors.request.use(async (config) => {
  const userToken = await TokenService.getToken("user");
  const guestToken = await TokenService.getToken("guest");

  if (userToken) {
    config.headers.Authorization = userToken;
    return config;
  }

  if (userToken == null && guestToken == null) {
    const guestToken = await fetchGuestToken();
    console.log(guestToken);
    config.headers.Authorization = guestToken;
    return config;
  }

  config.headers.Authorization = guestToken;
  return config;
});
