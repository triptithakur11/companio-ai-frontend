import axios from "axios";
import { getToken } from "../utils/storage";

const apiClient = axios.create({
  baseURL: "https://companio-ai-backend-tripti-new.azurewebsites.net/",
  // baseURL: 'http://localhost:3000',
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

export default apiClient;
