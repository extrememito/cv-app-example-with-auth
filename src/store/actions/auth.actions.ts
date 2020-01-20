import { action, ActionType } from 'typesafe-actions'
import { Dispatch } from 'redux'
import { AuthStorage } from '../../typings/interfaces'

const USER_DATA = 'USER_DATA'

const fakeApiLogin = (user: string, password: string) => {
  return new Promise<string>((res, rej) => {
    setTimeout(() => {
      if (user === 'miro@gajdos.com' && password === 'heslo') {
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
  const data: AuthStorage = {
    token,
    user,
  }
  localStorage.setItem(USER_DATA, JSON.stringify(data))
}

export const logout = () => {
  // Clear timer
  localStorage.removeItem(USER_DATA)
  return action(AuthActionTypes.LOGOUT)
}

export type AuthActions = ActionType<typeof signUpSuccess | typeof logout>
