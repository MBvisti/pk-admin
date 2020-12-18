import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  AuthFunctions,
  AuthState,
  UserAuthDetails,
  UserData,
  PkCookie,
} from "./interfaces";
import { apiClient, endpoints } from "../http/api";

const AuthContext = React.createContext({});
export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = (props: any) => {
  const [state, setState] = useState<AuthState>({
    userData: {
      name: "",
      accessToken: "",
      isAuthenticated: false,
      userID: 0,
    },
    loading: false,
    error: null,
  });

  // TODO: revisited this auth flow when getting closer to prod
  useEffect(() => {
    const tknDetails = Cookies.getJSON("pk-admin") as PkCookie;
    if (tknDetails) {
      console.log(tknDetails.tknExpiry);
      setState((s) => ({
        ...s,
        userData: {
          name: tknDetails.name,
          accessToken: tknDetails.token,
          isAuthenticated: true,
          userID: tknDetails.userID,
        },
        loading: false,
      }));

      apiClient.interceptors.request.use(
        (config) => {
          config.headers["Token"] = state.userData.accessToken;
          return config;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [state.userData.accessToken]);

  // TODO: revisited this auth flow when getting closer to prod
  const login = async (e: React.FormEvent, payload: UserAuthDetails) => {
    e.preventDefault();

    const res = await endpoints.authentication().userLogin(payload);

    setState({
      ...state,
      loading: true,
    });

    // TODO: very fragile will have to revisit - but works for now
    if (res.message === "Request failed with status code 500") {
      setState({
        ...state,
        loading: false,
        error: res.message,
      });

      return;
    }
    if (res !== undefined) {
      if (
        res.headers["token"].length === undefined ||
        res.headers["token"].length === 0
      ) {
        setState({
          ...state,
          loading: false,
          error:
            "There was an error requesting data - please refresh and try again",
        });
      }

      if (res.status === 200 && res.headers["token"].length !== 0) {
        setState({
          ...state,
          userData: {
            name: res.data.user.name,
            accessToken: res.headers["token"],
            isAuthenticated: true,
            userID: res.data.user.id,
          },
          loading: false,
          error: "no errors",
        });

        apiClient.interceptors.request.use(
          (config) => {
            config.headers["Token"] = res.headers["token"];
            return config;
          },
          (error) => {
            console.log(error);
          }
        );
        // set a cookie with token details
        Cookies.set("pk-admin", {
          token: res.headers["token"],
          name: res.data.user.name,
          tknExpiry: res.headers["tokenexpiry"],
          userID: res.data.user.id,
        });
      }
    }
  };

  // TODO: revisit this
  const logout = async () => {
    // remove the pk-admin cookie
    Cookies.remove("pk-admin");

    // reset state (just for good measure)
    setState({
      userData: {
        accessToken: "",
        name: "",
        isAuthenticated: false,
        userID: 0,
      },
      loading: false,
      error: null,
    });
  };

  const userData = state.userData as UserData;
  const loadingState = state.loading;
  const error = state.error;
  const authFunctions: AuthFunctions = {
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={{ userData, loadingState, authFunctions, error }}
      {...props}
    />
  );
};

export default AuthProvider;
