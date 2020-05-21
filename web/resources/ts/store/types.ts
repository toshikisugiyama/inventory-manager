export interface AuthState {
  user: User | null,
  apiStatus: boolean | null,
  loginError: LoginError | null
}

export interface User {
  name?: string,
  email?: string,
  password?: string,
}

export interface ErrorState {
  code: string | null
}

export interface LoginError {
  email?: Array<string>,
  password?: Array<string>
}
