import {createContext, ReactNode, useContext, useMemo} from 'react'
import {getFirestore, collection, CollectionReference} from 'firebase/firestore'

import {FirebaseContext} from './FirebaseProvider'
import {AuthContext} from './AuthProvider'

interface FirestoreContextValue {
  walletsCollection: CollectionReference;
}

export const FirestoreContext = createContext<FirestoreContextValue | null>(null)

interface FirestoreProviderProps {
  children?: ReactNode;
}

const FirestoreProvider = ({children}: FirestoreProviderProps) => {
  const app = useContext(FirebaseContext)
  const auth = useContext(AuthContext)
  const db = getFirestore(app)

  const walletsCollection = useMemo(() => {
    return collection(db, `users/${auth?.currentUser?.uid}/wallets`)
  }, [db, auth?.currentUser])

  const contextValue = useMemo<FirestoreContextValue>(() => ({
    walletsCollection,
  }), [walletsCollection])

  return (
    <FirestoreContext.Provider value={contextValue}>
      {children}
    </FirestoreContext.Provider>
  )
}

export default FirestoreProvider

export const useFirestore = (): FirestoreContextValue => {
  const contextValue = useContext(FirestoreContext)

  if (contextValue === null) {
    throw new Error("Firestore context value couldn't be found")
  }

  return contextValue
}
