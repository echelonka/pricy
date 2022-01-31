import React from 'react'
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router-dom'
import {fallbackLng, supportedLngs} from 'i18n'

import Landing from 'pages/Landing'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Dashboard from 'pages/Dashboard'

type RouteConf = {
  path: string,
  component: React.ComponentType<RouteComponentProps>,
  exact?: boolean,
}

export const ROUTE_CONF = {
  LANDING: '/:lang',
  DASHBOARD: '/:lang/dashboard',
  SIGN_IN: '/:lang/sign-in',
  SIGN_UP: '/:lang/sign-up',
}

const routes: RouteConf[] = [
  {
    path: ROUTE_CONF.SIGN_UP,
    component: SignUp,
  },
  {
    path: ROUTE_CONF.SIGN_IN,
    component: SignIn,
  },
  {
    path: ROUTE_CONF.DASHBOARD,
    component: Dashboard,
  },
  {
    path: ROUTE_CONF.LANDING,
    exact: true,
    component: Landing,
  },
]

const Routes = () => (
  <Switch>
    {routes.map((route: RouteConf, i: number) => (
      <Route
        key={i}
        path={route.path}
        exact={route.exact}
        render={props => (
          supportedLngs.includes(props.match.params.lang) ? (
            <route.component {...props} />
          ) : (
            <Redirect to={`/${fallbackLng}/`}/>
          )
        )}
      />
    ))}
    <Redirect from={'/'} to={`/${fallbackLng}/`}/>
  </Switch>
)

export default Routes
