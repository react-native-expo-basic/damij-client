import axios from "axios";
import TokenService from "../services/TokenSerivce";

export const instance = axios.create({
  baseURL: "http://13.124.181.25/",
});

export const authInstance = axios.create({
  baseURL: "http://13.124.181.25/",
});
authInstance.interceptors.request.use(async (config) => {
  if (config.headers === undefined) console.log(config.headers);
  const token = await TokenService.get();

  config.headers.Authorization = token;
  console.log(config.headers.Authorization);
  return config;
});
