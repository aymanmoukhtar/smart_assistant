import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from "axios";

import { useAppStore } from "../app.store";

import { ApiStatus } from "./common.types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

export interface ApiResponse<T> {
  data: T;
  headers: AxiosResponseHeaders;
  error: string | undefined;
  status: ApiStatus;
  statusCode: number;
}

const casePerStatus: Record<number, ApiStatus> = {
  400: ApiStatus.BAD_REQUEST,
  404: ApiStatus.NOT_FOUND,
  500: ApiStatus.SERVER_ERROR,
  403: ApiStatus.UNAUTHORIZED,
  401: ApiStatus.UNAUTHENTICATED,
  409: ApiStatus.CONFLICT,
};

// Error transformer
const transformError = <T>(error: any): ApiResponse<T> => ({
  data: undefined as T,
  headers: error.response?.headers,
  error:
    error.response?.data?.error?.message || error.message || "Unknown error",
  statusCode: error.response?.status || 500,
  status: casePerStatus[error.status] || ApiStatus.UNKNOWN,
});

// Response transformer
const transformResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => ({
  data: response.data,
  headers: response.headers as AxiosResponseHeaders,
  error: undefined,
  statusCode: response.status,
  status: casePerStatus[response.status] || ApiStatus.UNKNOWN,
});

// Unified API call handler
const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>,
): Promise<ApiResponse<T>> => {
  try {
    const response = await request;

    return transformResponse(response);
  } catch (error: any) {
    return transformError(error);
  }
};

// Exported API methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(axiosInstance.get<T>(url, config)),

  post: <T, D = any>(
    url: string,
    payload?: D,
    config?: AxiosRequestConfig<D>,
  ) => handleRequest<T>(axiosInstance.post<T>(url, payload, config)),

  put: <T, D = any>(url: string, payload?: D, config?: AxiosRequestConfig<D>) =>
    handleRequest<T>(axiosInstance.put<T>(url, payload, config)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(axiosInstance.delete<T>(url, config)),

  patch: <T, D = any>(
    url: string,
    payload?: D,
    config?: AxiosRequestConfig<D>,
  ) => handleRequest<T>(axiosInstance.patch<T>(url, payload, config)),
};

export const setupAxios = () => {
  // Set default headers
  axiosInstance.defaults.headers.Accept = "application/json";

  // Request interceptor
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      const {
        accessToken,
        userActions: { logout, isSessionExpired },
      } = useAppStore.getState();

      if (!accessToken) {
        return config;
      }

      if (!isSessionExpired()) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // If the token is expired, attempt to refresh it
      if (isSessionExpired()) {
        logout();
        window.location.href = "/user/login";
        throw new Error("Session expired");
      }

      return config;
    },
    // Propagate any request errors
    async (error: any) => Promise.reject(error),
  );
};
