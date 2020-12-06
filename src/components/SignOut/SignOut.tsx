import React, {useContext} from 'react'
import {FirebaseContext} from 'context/Firebase'
import styles from './SignOut.module.scss'
import {useTranslation} from 'react-i18next'

const SignOut = () => {
  const firebase = useContext(FirebaseContext)
  const {t} = useTranslation()

  return (
    <button className={styles.button} onClick={firebase!.signOut}>{t('signOut')}</button>
  )
}

export default SignOut
