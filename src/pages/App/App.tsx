import React, {useContext} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from 'routes'
import {FirebaseContext} from 'context/Firebase'
import {AuthUserContext} from 'context/Session'
import Navigation from 'components/Navigation/Navigation'
import useFirebaseAuthentication from 'hooks/useFirebaseAuthentication'

const App: React.FC = () => {
  const firebase = useContext(FirebaseContext)
  const authUser = useFirebaseAuthentication(firebase)

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Navigation/>
        <Routes/>
      </Router>
    </AuthUserContext.Provider>
  )
}

export default App
