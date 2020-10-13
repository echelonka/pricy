import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthUserContext} from 'context/Session'
import {ROUTE_CONF} from 'routes'
import Spinner from 'components/Spinner'

const withPrivateRouting = Component => {
  const WithPrivateRouting = props => {
    const authUser = useContext(AuthUserContext)

    return authUser !== null
      ? <Component {...props}/>
      : localStorage.getItem('expectSignIn')
        ? <Spinner fullPage/>
        : <Redirect to={ROUTE_CONF.SIGN_IN}/>
  }

  return WithPrivateRouting
}

export default withPrivateRouting
