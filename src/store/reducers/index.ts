import { combineReducers } from 'redux'
import { State } from '../../typings/interfaces'


import { authReducer } from './auth.reducer'

export const reducer = combineReducers<State>({
  auth: authReducer,
})
