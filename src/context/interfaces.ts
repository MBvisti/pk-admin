export interface UserData {
    name: string,
    accessToken: string,
    isAuthenticated: boolean,
}

export interface AuthPayload {
    userData: UserData,
    authFunctions: AuthFunctions,
}

export interface AuthFunctions {
    login: any,
    logout: any,
}

export interface UserAuthDetails {
    username: string,
    password: string,
}

export interface AuthState {
    userData: UserData,
    status: string,
    error: string | null,
}