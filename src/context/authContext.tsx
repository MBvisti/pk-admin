import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {AuthState, UserAuthDetails, UserData} from "./interfaces";
import {apiClient, endpoints} from "../http/api";

const AuthContext = React.createContext({});
export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = (props: any) => {
    const [state, setState] = useState<AuthState>({
        userData: {
            name: "",
            accessToken: "",
            isAuthenticated: false,
        },
        loading: false,
        error: null
    })

    const tknDetails = Cookies.getJSON("pk-admin")

    // TODO: revisited this auth flow when getting closer to prod
    useEffect(() => {
        if (tknDetails) {
            console.log(tknDetails["tknExpiry"] > Date.now())
            setState({
                ...state,
                userData: {
                    name: tknDetails.name,
                    accessToken: tknDetails["token"],
                    isAuthenticated: true,
                },
                loading: false
            })
        }

        apiClient.interceptors.request.use(
            config => {
                config.headers["Token"] = state.userData.accessToken
                return config;
            },
            error => {
                console.log(error)
            }
        )
    }, [])

    // TODO: revisited this auth flow when getting closer to prod
    const login = async (e: Event, payload: UserAuthDetails ) => {
        e.preventDefault()

        const res = await endpoints.authentication().userLogin(payload)

        setState({
            ...state,
            loading: true,
        })

        if (res.status === 200 && res.headers["token"].length !== 0) {
            setState({
                ...state,
                userData: {
                    name: res.data.name,
                    accessToken: res.headers["token"],
                    isAuthenticated: true,
                },
                loading: false
            })

            apiClient.interceptors.request.use(
                config => {
                    config.headers["Token"] = res.headers["token"]
                    return config;
                },
                error => {
                    console.log(error)
                }
            )

            // set a cookie with token details
            Cookies.set("pk-admin", {
                token: res.headers["token"],
                name: res.data.name,
                tknExpiry: res.headers["tokenexpiry"]
            })
        }

        if (res.status !== 200 && res.headers["token"].length === undefined) {
            console.log("Hello?")
            setState({
                ...state,
                loading: false
            })
        }
    }

    // TODO: revisit this
    const logout = async () => {
        // remove the pk-admin cookie
        Cookies.remove("pk-admin")

        // reset state (just for good measure)
        setState({
            userData: {
                accessToken: "",
                name: "",
                isAuthenticated: false,
            },
            loading: false,
            error: null,
        })
    }

    const userData = state.userData as UserData;
    const loadingState = state.loading;

    return (
        <AuthContext.Provider value={{userData, login, loadingState, logout}} {...props} />
    );
}

export default AuthProvider;