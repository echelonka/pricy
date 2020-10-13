import {useEffect, useState} from 'react'

const useFirebaseAuthentication = firebase => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const authStateListener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) localStorage.setItem('expectSignIn', '1')
      else localStorage.removeItem('expectSignIn')

      setAuthUser(authUser)
    })
    return () => authStateListener()
  })

  return authUser
}

export default useFirebaseAuthentication
