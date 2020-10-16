import React, {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Container from 'components/Container'
import {ROUTE_CONF} from 'routes'
import SignOut from 'components/SignOut/SignOut'
import {AuthUserContext} from 'context/Session'

type LogoProps = {
  isLoggedIn: boolean,
}

const Navigation: React.FC = () => {
  const authUser = useContext(AuthUserContext)

  return (
    <nav className={styles.bar}>
      <Container className={styles.container}>
        <div><Logo isLoggedIn={!!authUser}/></div>
        <ul className={styles.links}>
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
