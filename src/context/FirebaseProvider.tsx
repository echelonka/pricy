import { createContext, ReactNode, useContext } from 'react'
import {FirebaseApp, initializeApp} from 'firebase/app'

type FirebaseProviderValue = FirebaseApp | undefined

export const FirebaseContext = createContext<FirebaseProviderValue>(undefined)

const FirebaseProvider = ({children}: {children?: ReactNode}) => {
  const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
  })

  return (
    <FirebaseContext.Provider value={app}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider

export const useFirebase = () => {
  const contextValue = useContext(FirebaseContext)

  if (contextValue === undefined) {
    throw new Error("Firebase context value couldn't be found")
  }

  return contextValue
}
