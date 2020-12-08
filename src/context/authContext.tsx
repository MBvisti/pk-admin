import React, {useState} from 'react';
import {AuthState, UserAuthDetails, UserData} from "./interfaces";

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

    // const login = async (mail, password) => {
    //     const loginData = {
    //         mail,
    //         password
    //     }
    //
    //     setState({
    //         ...state,
    //         status: 'loading',
    //     })
    //
    //     const res = await api.authentication("login").userLogin(JSON.stringify(loginData))
    //
    //     console.log(res);
    //
    //     setState({
    //         userData: {
    //             name: res.data.userName,
    //             accessToken: res.data.accessToken
    //         },
    //         status: 'success',
    //         error: null,
    //     })
    //
    //     apiClient.interceptors.request.use(
    //         config => {
    //             config.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
    //             return config;},
    //         error => {
    //             console.log(error)
    //         });
    // }

    const login = (e: Event, payload: UserAuthDetails ) => {
        e.preventDefault()

        setState({
            ...state,
            loading: true,
        })

        setTimeout(() => {
            setState({
                ...state,
                userData: {
                    name: payload.username,
                    accessToken: payload.password,
                    isAuthenticated: true,
                },
                loading: false
            })
        }, 4000)

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