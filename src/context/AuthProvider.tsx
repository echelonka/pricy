import {createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode} from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as fSignOut,
  User,
  UserCredential
} from 'firebase/auth'

import {FirebaseContext} from 'context/FirebaseProvider'

interface AuthContextValue {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const app = useContext(FirebaseContext)
  const auth = getAuth(app)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const signIn = useCallback((email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }, [auth])

  const signUp = useCallback((email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }, [auth])

  const signOut = useCallback(() => fSignOut(auth), [auth])

  const contextValue = useMemo<AuthContextValue>(() => ({
    currentUser,
    signIn,
    signUp,
    signOut,
  }), [currentUser, signIn, signUp, signOut])

  useEffect(() => {
    const authStateListener = auth.onAuthStateChanged(authUser => {
      if (authUser) localStorage.setItem('expectSignIn', '1')
      else localStorage.removeItem('expectSignIn')

      setCurrentUser(authUser)
    })

    return () => authStateListener()
  }, [auth])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = (): AuthContextValue => {
  const contextValue = useContext(AuthContext)

  if (contextValue === null) {
    throw new Error("Auth context value couldn't be found")
  }

  return contextValue
}
