import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

// Import config
import { axiosConfig } from "./config";
import { UserAuthDetails } from "../context/interfaces";
import { error } from "console";

export const apiClient = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: axiosConfig.timeout,
});

export const endpoints = {
  status() {
    return {
      apiStatus: async () => {
        const res = await apiClient.get("/alive");
        return res;
      },
    };
  },
};

export const authentication = {
  userLogin: (userDetails: UserAuthDetails) =>
    apiClient.post(
      "/Login/Authenticate/?initialData=true",
      JSON.stringify(userDetails)
    ),
};
