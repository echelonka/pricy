import React, {useContext, useEffect, useState} from 'react'
import styles from './Wallets.module.scss'
import ContentLoader from 'react-content-loader'
import {FirebaseContext} from 'context/Firebase'
import {Wallet} from 'types'
import WalletCard from './Wallet'

const Wallets = () => {
  const firebase = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)
  const [wallets, setWallets] = useState<Wallet[]>([])

  useEffect(() => {
    const walletsListener = firebase!.walletsCollection.onSnapshot(snapshot => {
      setWallets(snapshot.docs.map(wallet => ({
        id: wallet.id,
        ...wallet.data(),
      } as Wallet)))
      setLoading(false)
    })
    return () => walletsListener()
  }, [firebase])

  return (
    <>
      <h2>Wallets</h2>
      <div className={styles.container}>
        {loading ? (
          <>
            <WalletLoader/>
            <WalletLoader/>
            <WalletLoader/>
          </>
        ) : (
          wallets.map(wallet => <WalletCard key={wallet.id} {...wallet} />)
        )}
      </div>
    </>
  )
}

const WalletLoader = () => {
  return (
    <div className={styles.card}>
      <ContentLoader
        height={85}
        gradientRatio={.75}
        backgroundColor={'#fff'}
        backgroundOpacity={.5}
        foregroundOpacity={.25}
        width={'100%'}
      >
        <rect x="0" y="0" rx="4" ry="4" width="150" height="20"/>
        <rect x="0" y="35" rx="4" ry="4" width="200" height="15"/>
        <rect x="0" y="65" rx="4" ry="4" width="100" height="20"/>
      </ContentLoader>
    </div>
  )
}

export default Wallets
