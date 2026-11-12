import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { APIRoute } from '@/const';
import { getToken } from './token';

type ServerError = {
  errorType: string;
  message: string;
};

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_HEADER_NAME = 'X-Token';
const AUTH_CHECK_METHOD = 'get';
const NETWORK_ERROR_MESSAGE =
  'No connection to the server. Check your network and try again.';
const SERVER_ERROR_MESSAGE = 'Something went wrong. Server error';

function isAuthCheckError(error: AxiosError): boolean {
  return (
    error.response?.status === StatusCodes.UNAUTHORIZED &&
    error.config?.method === AUTH_CHECK_METHOD &&
    error.config.url === APIRoute.Login
  );
}

function getErrorMessage(error: AxiosError<ServerError>): string {
  if (!error.response) {
    return NETWORK_ERROR_MESSAGE;
  }

  return (
    error.response.data?.message ??
    `${SERVER_ERROR_MESSAGE} ${error.response.status}`
  );
}

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers[TOKEN_HEADER_NAME] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ServerError>) => {
      if (!isAuthCheckError(error)) {
        const message = getErrorMessage(error);
        toast.error(message, { toastId: message });
      }

      throw error;
    },
  );

  return api;
}
