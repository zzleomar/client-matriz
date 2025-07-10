import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI ?? 'http://0.0.0.0:8002',
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default API;