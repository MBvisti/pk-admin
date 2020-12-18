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
  status(url: string) {
    return {
      apiStatus: () => apiClient.get(url),
    };
  },
  user() {
    return {
      getMemberParkingIds: (userID: Number) =>
        apiClient
          .get(`/user/memberParkingIds/${userID} `)
          .then((res) => res)
          .catch((err) => err.toJSON()),
    };
  },
  authentication() {
    return {
      userLogin: (userDetails: UserAuthDetails) =>
        apiClient
          .post(
            "/Login/Authenticate/?initialData=true",
            JSON.stringify(userDetails)
          )
          .catch((err) => {
            return err.toJSON();
          }),
    };
  },
  parkingFee() {
    return {
      paginatedFee: (addressID: Array<number>) =>
        apiClient
          .post(
            "/parkingFees/paginatedFees",
            JSON.stringify({ addressIds: [...addressID] })
          )
          .then((res) => res)
          .catch((err) => {
            console.log(err.toJSON());
          }),
    };
  },
  parkingAddress() {
    return {
      getAddresses: (userID: number) =>
        apiClient
          .post(
            "/addresses/paginatedAddresses",
            JSON.stringify({ userId: userID })
          )
          .then((res) => res)
          .catch((err) => {
            console.log(err.toJSON());
          }),
    };
  },
  feeHistory() {
    return {
      getFees: (userID: number) => {
        apiClient
          .get(`/feeHistory/fee`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            return err.toJSON();
          });
      },
    };
  },
};
