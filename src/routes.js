import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from 'pages/Landing'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Dashboard from 'pages/Dashboard'

export const ROUTE_CONF = {
  LANDING: '/',
  DASHBOARD: '/dashboard',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
}

const routes = [
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
    {routes.map((route, i) => (
      <Route
        key={i}
        path={route.path}
        render={props => (<route.component {...props} />)}
      />
    ))}
  </Switch>
)

export default Routes
