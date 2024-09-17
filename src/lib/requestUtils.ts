import { AppConfig } from "@/config/env.config";
import axios, { AxiosError } from "axios";

export const POST = async (path: string, payload: unknown) => {
  return axios
    .post(`${AppConfig.BASE_URL}${path}`, payload, { withCredentials: true})
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
      return error.response?.data;
    });
};

export const GET = async (path: string) => {
  return axios
    .get(`${AppConfig.BASE_URL}${path}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
      return error.response?.data;
    });
};
