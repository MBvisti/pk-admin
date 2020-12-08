export const axiosConfig = {
    baseURL: process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_BASE_URL_PROD}` : `${process.env.REACT_APP_BASE_URL_DEV}`,
    timeout: 4000
}