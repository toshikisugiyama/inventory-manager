export interface AuthState {
  user: User | null
}

export interface User {
  name?: string,
  email?: string,
  password?: string,
}
