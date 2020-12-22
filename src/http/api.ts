import axios from "axios";

// Import config
import { axiosConfig } from "./config";
import { UserAuthDetails } from "../context/interfaces";

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
  parkingAddresses() {
    return {
      paginatedAddresses: async (user: { userId: number }) => {
        try {
          const response = await apiClient.post(
            "/addresses/paginatedAddresses",
            JSON.stringify(user)
          );

          return response.data;
        } catch (err) {
          console.log(err);
        }
      },
    };
  },
  fees() {
    return {
      paginatedFees: async (user: { userId: number }) => {
        try {
          const response = await apiClient.post(
            "/parkingFees/paginatedFees",
            JSON.stringify(user)
          );

          return response.data;
        } catch (err) {
          console.log(err);
        }
      },
    };
  },
};

export const authentication = {
  userLogin: (userDetails: UserAuthDetails) =>
    apiClient.post("/Login/Authenticate", JSON.stringify(userDetails)),
};
