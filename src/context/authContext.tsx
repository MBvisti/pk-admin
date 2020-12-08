import React, {useState} from 'react';

const AuthContext = React.createContext({});
export const useAuth = () => React.useContext(AuthContext);

export interface UserData {
    name: string,
    accessToken: string,
}

interface AuthState {
    userData: UserData,
    status: string,
    error: string | null,
}

const AuthProvider = (props: any) => {
    const [state] = useState<AuthState>({
        userData: {
            name: "Simon Høj",
            accessToken: "kdaæmdksalmdlmaskdmsaklmdklsamdmaskdmkaslmdkmdklasmkldmsakldmklasmdklasml",
        },
        status: 'pending',
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

    const userData = state.userData;

    return (
        <AuthContext.Provider value={userData} {...props} />
    );
}

export default AuthProvider;