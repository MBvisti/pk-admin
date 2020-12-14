import React, {useState} from 'react';
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

    // useEffect(() => {
    //     api.authentication("refresh-token").refreshToken()
    //         .then(res => {
    //             console.log(res)
    //             setState( state => ({
    //                 ...state,
    //                 userData: {
    //                     name: res.data.userName,
    //                     accessToken: res.data.accessToken
    //                 }
    //             }))
    //             apiClient.interceptors.request.use(
    //                 config => {
    //                     config.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
    //                     return config;
    //                 },
    //                 error => {
    //                     console.log(error)
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     // 	// eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // TODO: add cookie to store token that can then be used to authenticate while active
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
        }

        if (res.status !== 200 && res.headers["token"].length === undefined) {
            console.log("Hello?")
            setState({
                ...state,
                loading: false
            })
        }
    }

    // const logout = async () => {
    //     const res = await api.authentication("logout").logout()
    //
    //     if (res.status === 200) {
    //         setState({
    //             userData: {
    //                 name: "",
    //                 accessToken: ""
    //             },
    //             status: 'pending',
    //             error: null
    //         })
    //     }
    // }

    const userData = state.userData as UserData;
    const loadingState = state.loading;

    return (
        <AuthContext.Provider value={{userData, login, loadingState}} {...props} />
    );
}

export default AuthProvider;