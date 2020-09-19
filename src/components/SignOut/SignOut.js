import React, {useContext} from 'react'
import {FirebaseContext} from 'context/Firebase'
import styles from './SignOut.module.scss'

const SignOut = () => {
  const firebase = useContext(FirebaseContext)

  return (
    <button className={styles.button} onClick={firebase.signOut}>Sign Out</button>
  )
}

export default SignOut
