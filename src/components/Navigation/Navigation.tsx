import React, {useContext, useEffect, useState} from 'react'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Container from 'components/Container'
import {ROUTE_CONF} from 'routes'
import SignOut from 'components/SignOut/SignOut'
import {AuthUserContext} from 'context/Session'

type LogoProps = {
  isLoggedIn: boolean,
}

const Navigation: React.FC<RouteComponentProps> = props => {
  const authUser = useContext(AuthUserContext)
  const {pathname} = props.location
  const [loggedInLanding, setLoggedInLanding] = useState(false)

  useEffect(() => {
    setLoggedInLanding(!!authUser && pathname === ROUTE_CONF.LANDING)
  }, [authUser, pathname])

  return (
    <nav className={styles.bar}>
      <Container className={styles.container}>
        <div><Logo isLoggedIn={!!authUser}/></div>
        <ul className={styles.links}>
          {loggedInLanding ? (
            <Link to={ROUTE_CONF.DASHBOARD}>Dashboard</Link>
          ) : authUser ? (
            <Link to={ROUTE_CONF.LANDING}>Home</Link>
          ) : null}
          {!authUser ? (
            <li>
              <Link to={ROUTE_CONF.SIGN_IN}>Sign in</Link>
            </li>
          ) : (
            <li>
              <SignOut/>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  )
}

const Logo = (props: LogoProps) => {
  const {isLoggedIn} = props
  const path = isLoggedIn ? ROUTE_CONF.DASHBOARD : ROUTE_CONF.LANDING

  return (
    <Link className={styles.logo} to={path}><b>Pricy</b></Link>
  )
}

export default withRouter(Navigation)
