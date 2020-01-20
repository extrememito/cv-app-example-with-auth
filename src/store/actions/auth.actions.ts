import { action, ActionType } from 'typesafe-actions'
import { Dispatch } from 'redux'

export const USER = 'user'
export const TOKEN = 'token'

const fakeApiLogin = (user: string, password: string) => {
  return new Promise<string>((res, rej) => {
    setTimeout(() => {
      if (user === 'user@email.com' && password === 'password') {
        res('faelkfjfeafj4lk1341l')
      } else {
        rej('Wrong email or password')
      }
    }, 3000)
  })
}

const fakeApiRegister = (user: string, password: string) => {
  return new Promise<string>((res, rej) => {
    setTimeout(() => {
      // Backend email/password validation
      res('faelkfjfeafj4lk1341l')
    }, 3000)
  })
}

export enum AuthActionTypes {
  SIGNUP = 'SIGNUP',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  LOGOUT = 'LOGOUT',
}

const authFactory = (login = false) => (
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    let token: string
    if (login) {
      token = await fakeApiLogin(email, password)
    } else {
      token = await fakeApiRegister(email, password)
    }

    dispatch(signUpSuccess(token, email))
    saveDataToStorage(token, email)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const signUp = authFactory()
export const login = authFactory(true)

export const signUpSuccess = (token: string, user: string) =>
  action(AuthActionTypes.SIGNUP, { token, user })

export const signUpError = () => action(AuthActionTypes.SIGNUP_ERROR)

const saveDataToStorage = (token: string, user: string) => {
  localStorage.setItem(USER, user)
  localStorage.setItem(TOKEN, token)
}

export const logout = () => {
  // Clear timer
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
  return action(AuthActionTypes.LOGOUT)
}

export type AuthActions = ActionType<
  typeof signUpSuccess | typeof logout | typeof signUpError
>
