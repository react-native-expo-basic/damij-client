import axios from "axios";
import TokenService from "../services/TokenSerivce";

export const authInstance = axios.create({
  baseURL: "http://13.124.181.25",
});
authInstance.interceptors.request.use(async (config) => {
  const token = await TokenService.get();
  config.headers.Authorization = token;

  return config;
});
