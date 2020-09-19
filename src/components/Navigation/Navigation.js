import React, {useContext, useEffect} from 'react'
import {Link, withRouter, useLocation} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Container from 'components/Container'
import {ROUTE_CONF} from 'routes'
import SignOut from 'components/SignOut/SignOut'
import {AuthUserContext} from 'context/Session'

const Navigation = () => {
  const authUser = useContext(AuthUserContext)
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <nav className={styles.bar}>
      <Container className={styles.container}>
        <div><b>Pricy</b></div>
        <ul className={styles.links}>
          <li>
            <Link to={ROUTE_CONF.LANDING}>Home</Link>
          </li>
          <li>
            <Link to={ROUTE_CONF.SIGN_IN}>Sign in</Link>
          </li>
         <li>
           <SignOut/>
         </li>
        </ul>
      </Container>
    </nav>
  )
}

export default withRouter(Navigation)
