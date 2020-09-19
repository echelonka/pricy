import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './pages/App'
import Firebase from './api/Firebase'
import FirebaseContext from './context/Firebase/context'

const render = Component => {
  return ReactDOM.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}>
        <Component/>
      </FirebaseContext.Provider>
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
