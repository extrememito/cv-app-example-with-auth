import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './store'
import { Auth } from './components/Auth'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  )
}

export default App
