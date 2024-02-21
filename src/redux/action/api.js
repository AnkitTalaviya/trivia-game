import axios from "axios";
import config from "../../config";

const { API_URL } = config;

export const apiConfig = () => {
  const appConfigData = {
    method: "PUT,DELETE,POST,GET,OPTION",
    headers: {
      accept: "application/json",
    },
  };
  return appConfigData;
};

export const getApi = (url, options = {}) => {
  return axios.get(`${API_URL}${url}`, { ...apiConfig(), ...options });
};

export const postApi = (url, apiData) => {
  return axios.post(`${API_URL}${url}`, apiData, apiConfig());
};

export const putApi = (url, apiData) => {
  return axios.put(`${API_URL}${url}`, apiData, apiConfig());
};

export const patchApi = (url, apiData) => {
  return axios.patch(`${API_URL}${url}`, apiData, apiConfig());
};

export const deleteApi = (url) => {
  return axios.delete(`${API_URL}${url}`, apiConfig());
};

export const getApiError = (error) =>
  typeof error?.response?.data?.message === "string"
    ? error.response.data.message
    : "Something went wrong";

export const setupInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([403, 401].includes(error?.response?.status)) {
        window.location.reload();
      }

      return Promise.reject(error);
    }
  );
};
