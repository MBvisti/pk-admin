export const axiosConfig = {
  // TODO: this is hard coded for now since there are some issues with netlify reading env variables
  // baseURL: process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_BASE_URL_PROD}` : `${process.env.REACT_APP_BASE_URL_DEV}`,
  baseURL: "https://135.181.45.75:8088/ParkingApp/rest",
  timeout: 4000,
};
