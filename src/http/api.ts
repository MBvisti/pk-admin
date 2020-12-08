import axios from 'axios';

// Import config
import { axiosConfig } from './config';

export const apiClient = axios.create({
    baseURL: axiosConfig.baseURL,
    withCredentials: true,
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
            userLogin: (userDetails: any) => apiClient.post("/Login/Authenticate", userDetails),
            // refreshToken: () => apiClient.post(url),
            // logout: () => apiClient.post(url),
        }
    }
}