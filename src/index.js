import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './pages/App'
import Firebase, {FirebaseContext} from './components/Firebase'
import * as serviceWorker from './serviceWorker'

const render = Component => {
  return ReactDOM.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}>
        <Component/>
      </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NextApp = require('./pages/App').default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
