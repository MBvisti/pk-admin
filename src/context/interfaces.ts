export interface UserData {
  name: string;
  accessToken: string;
  isAuthenticated: boolean;
}

export interface AuthData {
  userData: UserData;
  error: string;
  authFunctions: AuthFunctions;
  loadingState: boolean;
}

export interface AuthFunctions {
  login: (e: React.FormEvent, payload: UserAuthDetails) => {};
  logout: any;
}

export interface UserAuthDetails {
  username: string;
  password: string;
}

export interface AuthState {
  userData: UserData;
  loading: boolean;
  error: string | null;
}
