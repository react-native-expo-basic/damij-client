import axios from "axios";
import TokenService from "../services/TokenSerivce";

export const fetchGuestToken = async () => {
  const response = await axios.post(
    `http://13.124.181.25/api/users/guestsignup`
  );
  TokenService.setToken("guest", response.headers.guest);
  return response.headers.guest;
};
