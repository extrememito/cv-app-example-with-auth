import React from 'react'
import { mount, route } from 'navi'
import { Router as NaviRouter, View } from 'react-navi'

import { Auth } from './components/Auth'
import { Cv } from './components/Cv'

const routes = mount({
  '/': route({
    title: 'CV',
    view: <Cv />,
  }),
  '/login': route({
    title: 'Login',
    view: <Auth />,
  }),
  '/register': route({
    title: 'Login',
    view: <Auth isRegister={true} />,
  }),
})

export const Router = () => {
  return (
    <NaviRouter routes={routes} context={{}}>
      {/* TODO fallback, etc */}
      <React.Suspense fallback={null}>
        <View />
      </React.Suspense>
    </NaviRouter>
  )
}
