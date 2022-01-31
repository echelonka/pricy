import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Container from 'components/Container'
import {ROUTE_CONF} from 'routes'
import SignOut from 'components/SignOut/SignOut'
import Button from 'components/Button'
import {useAuth} from 'context/AuthProvider'
import {useTranslation} from 'react-i18next'
import {supportedLngs} from 'i18n'
import usePathLocalization from 'hooks/usePathLocalization'
import {ReactComponent as PricyLogo} from 'assets/img/pricy_logo_transparent.svg'

type LogoProps = {
  isLoggedIn: boolean,
}

const Navigation: React.FC = () => {
  const {currentUser} = useAuth()
  const {pathname} = useLocation()
  const [loggedInLanding, setLoggedInLanding] = useState(false)
  const {t} = useTranslation()
  const dashboardPath = usePathLocalization(ROUTE_CONF.DASHBOARD)
  const landingPath = usePathLocalization(ROUTE_CONF.LANDING)
  const signInPath = usePathLocalization(ROUTE_CONF.SIGN_IN)

  useEffect(() => {
    setLoggedInLanding(!!currentUser && pathname.split('/').join('') === landingPath.split('/').join(''))
  }, [currentUser, landingPath, pathname])

  return (
    <header className={styles.bar}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <Logo isLoggedIn={!!currentUser}/>
          <Languages/>
        </div>
        <nav className={styles.links}>
          {loggedInLanding ? (
            <Link to={dashboardPath}>{t('dashboard')}</Link>
          ) : currentUser ? (
            <Link to={landingPath}>{t('home')}</Link>
          ) : null}
          {!currentUser ? (
            <Link to={signInPath}>{t('signIn')}</Link>
          ) : (
            <SignOut/>
          )}
        </nav>
      </Container>
    </header>
  )
}

const Logo = (props: LogoProps) => {
  const {isLoggedIn} = props
  const path = usePathLocalization(isLoggedIn ? ROUTE_CONF.DASHBOARD : ROUTE_CONF.LANDING)

  return (
    <Link className={styles.logo} to={path}>
      <PricyLogo/>
      <b>Pricy</b>
    </Link>
  )
}

const Languages = () => {
  const {i18n} = useTranslation()

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang)
  }

  return (
    <div className={styles.languages}>
      {supportedLngs.map(lang => (
        <Button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={'mr-1'}
          small
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}

export default Navigation
