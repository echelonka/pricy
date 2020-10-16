import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthUserContext} from 'context/Session'
import {ROUTE_CONF} from 'routes'
import Spinner from 'components/Spinner'

const withPrivateRouting = <P,>(Component: React.ComponentType<P>) => {
  return (props: any) => {
    const authUser = useContext(AuthUserContext)

    return authUser !== null
      ? <Component {...props as P}/>
      : localStorage.getItem('expectSignIn')
        ? <Spinner fullPage/>
        : <Redirect to={ROUTE_CONF.SIGN_IN}/>
  }
}

export default withPrivateRouting
