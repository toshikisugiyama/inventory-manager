export interface AuthState {
  user: User | null,
  apiStatus: boolean | null,
  loginErrorMessages: LoginError | null,
  registerErrorMessages: RegisterError | null
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

export interface RegisterError {
  name?: Array<string>,
  email?: Array<string>,
  password?: Array<string>
}
