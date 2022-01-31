import {ReactNode} from 'react'
import FirebaseProvider from './FirebaseProvider'
import AuthProvider from './AuthProvider'
import FirestoreProvider from './FirestoreProvider'

interface Props {
  children?: ReactNode;
}

const AppProvider = ({children}: Props) => (
  <FirebaseProvider>
    <AuthProvider>
      <FirestoreProvider>
        {children}
      </FirestoreProvider>
    </AuthProvider>
  </FirebaseProvider>
)

export default AppProvider
