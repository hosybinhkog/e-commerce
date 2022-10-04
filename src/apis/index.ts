import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://localhost:5555/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

clientAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default clientAxios;
