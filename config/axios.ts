import axios from "axios";
import PATH from "../src/app/_constants/PATH";

const axiosClient = axios.create({
  baseURL: "/api",
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  baseURL: PATH.BASE_URL,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers["TMS-CONNECT-KEY"] = "tms-connect-key";
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export { axiosClient, axiosInstance };
