import {useEffect, useState} from 'react'
import {FirebaseContextType} from 'context/Firebase/context'
import {User} from 'firebase'

const useFirebaseAuthentication = (firebase: FirebaseContextType) => {
  const [authUser, setAuthUser] = useState<User | null>(null)

  useEffect(() => {
    if (!firebase) return
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