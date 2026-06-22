import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {

    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },

  (error) => {

    const message =
      error.response?.data?.message ||
      "Something went wrong";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;