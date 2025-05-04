import axios from "axios";
import PATH from "../src/app/_constants/PATH";

const axiosClient = axios.create({
  baseURL: PATH.BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.status == 401) {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("isLogin", "");
    }

    return Promise.reject(error?.response?.data ?? error);
  }
);

const axiosInstance = axios.create({
  baseURL: PATH.BASE_URL,
});
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data ?? error)
);

export { axiosClient, axiosInstance };
