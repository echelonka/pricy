import React, {useEffect} from 'react'
import {BrowserRouter as Router, useHistory, useLocation} from 'react-router-dom'
import Routes from 'routes'
import {useTranslation} from 'react-i18next'

import Navigation from 'components/Navigation/Navigation'

const App: React.FC = () => (
  <Router>
    <Body/>
  </Router>
)

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
