import {useEffect, useState} from 'react'

const useFirebaseAuthentication = firebase => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const authStateListener = firebase.auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser)
    })
    return () => authStateListener()
  })

  return authUser
}

export default useFirebaseAuthentication
