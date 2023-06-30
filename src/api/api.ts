import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.124.181.25/",
});

export default instance;
