import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL?.trim().replace(/\/+$/, "");

if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is missing. Set it in frontend/.env and restart the frontend.");
}
const apiBaseUrl = apiUrl.replace(/\/api$/i, "");
const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
