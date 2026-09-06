import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities' as const;

export const REQUEST_TIMEOUT = 5000 as const;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
