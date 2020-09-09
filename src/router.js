import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

const routes = [
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/sign-in',
    component: SignIn
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/',
    exact: true,
    component: Landing
  },
]

export default function RouteConfig() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={props => (<route.component {...props} />)}
          />
        ))}
      </Switch>
    </Router>
  )
}
