import React from 'react'
import Firebase from 'api/Firebase'

export type FirebaseContextType = Firebase | null

const FirebaseContext = React.createContext<FirebaseContextType>(null)

export default FirebaseContext
