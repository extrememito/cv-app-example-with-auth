import React, { useEffect } from 'react'
import { mount, route, map, redirect } from 'navi'
import { Router as NaviRouter, View } from 'react-navi'

import { Auth } from './components/Auth'
import { Cv } from './components/Cv'
import { USER, TOKEN, signUpSuccess } from './store/actions/auth.actions'
import { RouterContext, State } from './typings/interfaces'
import { withAuthentication } from './utils/auth'
import { useDispatch, useSelector } from 'react-redux'

const routes = mount({
  '/': withAuthentication(
    route({
      title: 'CV',
      view: <Cv />,
    })
  ),
  '/login': map<RouterContext>((req, ctx) =>
    ctx.loggedIn
      ? redirect(
          req.params.redirectTo
            ? decodeURIComponent(req.params.redirectTo)
            : '/'
        )
      : route({
          title: 'Login',
          view: <Auth />,
        })
  ),
  '/register': map<RouterContext>((req, ctx) =>
    ctx.loggedIn
      ? redirect(
          req.params.redirectTo
            ? decodeURIComponent(req.params.redirectTo)
            : '/'
        )
      : route({
          title: 'Register',
          view: <Auth isRegister={true} />,
        })
  ),
})

export const Router = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector<State, boolean>(state => !!state.auth.token)
  const unsuccessfulLoginCount = useSelector<State, number>(
    state => state.auth.unsuccessfulLoginCount
  )

  useEffect(() => {
    const token = localStorage.getItem(TOKEN)
    const user = localStorage.getItem(USER)
    if (user && token) {
      dispatch(signUpSuccess(token, user))
    }
  }, [dispatch])

  useEffect(() => {
    if(unsuccessfulLoginCount > 3) {
      const postpone = new Date(new Date().getTime() + 3*60000);
    }
  }, [unsuccessfulLoginCount])

  return (
    <NaviRouter routes={routes} context={{ loggedIn }}>
      {/* TODO fallback, etc */}
      <React.Suspense fallback={null}>
        <View />
      </React.Suspense>
    </NaviRouter>
  )
}
