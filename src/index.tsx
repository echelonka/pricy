import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './i18n'
import App from './pages/App'
import Firebase from './api/Firebase'
import FirebaseContext from './context/Firebase/context'
import Loader from './components/Loader'

const render = (Component: React.ComponentType) => {
  return ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<Loader fullPage/>}>
        <FirebaseContext.Provider value={new Firebase()}>
          <Component/>
        </FirebaseContext.Provider>
      </Suspense>
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
