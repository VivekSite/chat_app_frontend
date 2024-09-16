import axios, { AxiosError } from "axios";
import { AppConfig } from "@/config/env.config";
import { User } from "@/types/types";

export const verifyToken = async (token: string): Promise<User> => {
  return axios
    .post(`${AppConfig.BASE_URL}/auth/verify`, { accessToken: token })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
      return null;
    });
};
