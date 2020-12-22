import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  AuthFunctions,
  AuthState,
  UserAuthDetails,
  UserData,
} from "./interfaces";

import { apiClient, endpoints, authentication } from "../http/api";

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
    const tknDetails = Cookies.getJSON("pk-admin");

    if (!tknDetails) {
      setState((s) => ({
        ...s,
        loading: false,
      }));

      return;
    }

    if (tknDetails["token"].length !== 0) {
      setState((s) => ({
        ...s,
        userData: {
          name: tknDetails.name,
          accessToken: tknDetails["token"],
          isAuthenticated: true,
          userID: tknDetails.id,
        },
        loading: false,
      }));

      apiClient.interceptors.request.use(
        (config) => {
          config.headers["Token"] = tknDetails["token"];
          return config;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // apiClient.interceptors.response.use(
    //   (res) => {
    //     // everything is good - carry on

    //     return res;
    //   },
    //   function (error) {
    //     console.log("error from interceptors");
    //     console.log(error);
    //     if (error.response.status === 401) {
    //       if (tknDetails) {
    //         setState((s) => ({
    //           ...s,
    //           userData: {
    //             name: tknDetails.name,
    //             accessToken: tknDetails["token"],
    //             isAuthenticated: true,
    //             userID: tknDetails.id,
    //           },
    //           loading: false,
    //         }));

    //         apiClient.interceptors.request.use(
    //           (config) => {
    //             config.headers["Token"] = state.userData.accessToken;
    //             return config;
    //           },
    //           (error) => {
    //             console.log(error);
    //           }
    //         );
    //       }
    //     }
    //   }
    // );
  }, []);

  // TODO: revisited this auth flow when getting closer to prod
  const login = async (e: React.FormEvent, payload: UserAuthDetails) => {
    e.preventDefault();

    setState({
      ...state,
      loading: true,
    });

    try {
      const res = await authentication.userLogin(payload);

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
      Cookies.set(
        "pk-admin",
        {
          token: res.headers["token"],
          name: res.data.user.name,
          tknExpiry: res.headers["tokenexpiry"],
          userId: res.data.user.id,
        },
        {
          sameSite: "None",
          secure: true,
        }
      );
    } catch (err) {
      setState({
        ...state,
        loading: false,
        error: "You've provided the wrong username or password",
      });
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
