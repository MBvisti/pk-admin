import axios from 'axios';

// Import config
import { axiosConfig } from './config';
import {UserAuthDetails} from "../context/interfaces";

export const apiClient = axios.create({
    baseURL: axiosConfig.baseURL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: axiosConfig.timeout
});

export const endpoints = {
    status(url: string) {
        return {
            apiStatus: () => apiClient.get(url),
        }
    },
    authentication() {
        return {
            userLogin: (userDetails: UserAuthDetails) => apiClient.post("/Login/Authenticate", JSON.stringify(userDetails)),
            // refreshToken: () => apiClient.post(url),
            // logout: () => apiClient.post(url),
        }
    }
}