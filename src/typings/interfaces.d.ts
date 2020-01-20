export interface AuthState {
  token: string
  user: string
  unsuccessfulLoginCount: number
}
export interface State {
  auth: AuthState
}

export interface RouterContext {
  loggedIn: boolean
}
