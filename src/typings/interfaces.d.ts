export interface AuthState {
  token: string
  user: string
  unsuccessfulLoginCount: number
}

export interface AuthStorage {
  token: string
  user: string
}

export interface State {
  auth: AuthState
}
