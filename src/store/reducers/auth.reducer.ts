import { Reducer } from 'redux'

import { AuthState } from '../../typings/interfaces'
import { AuthActions, AuthActionTypes } from '../actions/auth.actions'

const initialState: AuthState = {
  token: '',
  user: '',
  unsuccessfulLoginCount: 0
}

export const authReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGNUP: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}
