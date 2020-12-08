export interface UserData {
    name: string,
    accessToken: string,
    isAuthenticated: boolean,
}


export interface AuthPayload {
    userData: UserData,
    authFunctions: AuthFunctions,
    loadingState: boolean,
}


export interface AuthFunctions {
    login: (formEvent: React.FormEvent, state: UserAuthDetails) => {},
    logout: any,
}

export interface UserAuthDetails {
    username: string,
    password: string,
}

export interface AuthState {
    userData: UserData,
    loading: boolean,
    error: string | null,
}