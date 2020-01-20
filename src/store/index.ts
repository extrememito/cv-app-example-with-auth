import { createStore, Action, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { State } from '../typings/interfaces'

export const store = createStore<State, Action, {}, {}>(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
