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

export interface Loading {
  loadingState: boolean
}

export interface Materials {
  materialItems: Array<MaterialItem>,
  materialItem?: MaterialItem | null
}

export interface MaterialItem {
  id?: number,
  name?: string,
  supplier?: string,
  unit?: string,
  created_at?: string,
  updated_at?: string
}
