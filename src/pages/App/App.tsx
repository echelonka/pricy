import React, {useContext, useEffect} from 'react'
import {BrowserRouter as Router, useHistory, useLocation} from 'react-router-dom'
import Routes from 'routes'
import {FirebaseContext} from 'context/Firebase'
import {AuthUserContext} from 'context/Session'
import Navigation from 'components/Navigation/Navigation'
import useFirebaseAuthentication from 'hooks/useFirebaseAuthentication'
import {useTranslation} from 'react-i18next'

const App: React.FC = () => {
  const firebase = useContext(FirebaseContext)
  const authUser = useFirebaseAuthentication(firebase)

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Body/>
      </Router>
    </AuthUserContext.Provider>
  )
}

const Body: React.FC = () => {
  const {i18n} = useTranslation()
  const {pathname} = useLocation()
  const history = useHistory()

  useEffect(() => {
    i18n.on('languageChanged', lang => {
      history.replace(pathname.replace(/(?<=\/).*?(?=\/)/, lang))
    })
    return () => i18n.off('languageChanged')
  }, [i18n, history, pathname])

  return (
    <>
      <Navigation/>
      <main>
        <Routes/>
      </main>
    </>
  )
}

export default App
