export const axiosConfig = {
  // TODO: this is hard coded for now since there are some issues with netlify reading env variables
  // baseURL: process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_BASE_URL_PROD}` : `${process.env.REACT_APP_BASE_URL_DEV}`,
  baseURL: "https://test.apppark.dk/ParkingApp/rest",
  timeout: 4000,
};
