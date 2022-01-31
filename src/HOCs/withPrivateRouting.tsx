import {ComponentType} from 'react'
import {Redirect} from 'react-router-dom'
import {useAuth} from 'context/AuthProvider'
import {ROUTE_CONF} from 'routes'
import Loader from 'components/Loader'

const withPrivateRouting = <P,>(Component: ComponentType<P>) => {
  return (props: any) => {
    const {currentUser} = useAuth()

    return currentUser !== null
      ? <Component {...props as P}/>
      : localStorage.getItem('expectSignIn')
        ? <Loader fullPage/>
        : <Redirect to={ROUTE_CONF.SIGN_IN}/>
  }
}

export default withPrivateRouting
