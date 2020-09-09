import React, {useEffect} from 'react'
import {Link, withRouter, useLocation} from 'react-router-dom'
import styles from './Navigation.module.scss'
import SignOut from '../SignOut/SignOut'
import Container from '../Container'

const Navigation = props => {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <nav className={styles.bar}>
      <Container className={styles.container}>
        <div/>
        <ul className={styles.links}>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>Settings</li>
          <li>
            <SignOut/>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default withRouter(Navigation)
