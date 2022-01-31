import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {ThemeProvider} from 'styled-components'
import {GlobalStyles, lightTheme} from './styles/theme'
import './index.scss'
import './i18n'
import App from './pages/App'
import Firebase from './api/Firebase'
import FirebaseContext from './context/Firebase/context'
import Loader from './components/Loader'
import AppProvider from './context/AppProvider'

const render = (Component: React.ComponentType) => {
  return ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Suspense fallback={<Loader fullPage/>}>
          <AppProvider>
            <FirebaseContext.Provider value={new Firebase()}>
              <Component/>
            </FirebaseContext.Provider>
          </AppProvider>
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NextApp = require('./pages/App').default
    render(NextApp)
  })
}
