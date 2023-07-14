import axios from "axios";

export const fetchGuestToken = async () => {
  const response = await axios.post(
    `http://13.124.181.25/api/users/guestsignup`
  );
  return response.headers.guest;
};
