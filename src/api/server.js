import axios from "axios";
// import { getIdSchool, getIdTenancy, getToken, logout } from "./Auth";
// const baseURL = process.env.REACT_APP_API_URL;
let baseURL;

if (window.location.hostname === "localhost") {
  baseURL = "http://localhost:3000/api";
} else {
  baseURL = "https://back-end-agenda-estudos.onrender.com/api";
}

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  //   config.headers["X-Customer"] = getIdTenancy();
  //   config.headers["X-School"] = getIdSchool();
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 401 && error.response.status !== undefined) {
      //  toast.error("Sessao expirada, Favor realizar o login novamente!");
      //   logout();
    }
    return Promise.reject(error.response);
  }
);

export default api;
