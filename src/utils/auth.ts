import { RouterContext } from './../typings/interfaces.d'
import { map, Matcher, redirect } from 'navi'

export function withAuthentication(matcher: Matcher<RouterContext>) {
  return map<RouterContext>((req, ctx) =>
    ctx.loggedIn
      ? matcher
      : redirect(
          '/login?redirectTo=' + encodeURIComponent(req.mountpath + req.search)
        )
  )
}
