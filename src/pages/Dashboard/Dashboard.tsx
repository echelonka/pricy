import React, {useContext, useEffect, useState} from 'react'
import withPrivateRouting from 'HOCs/withPrivateRouting'
import Container from 'components/Container'
import Wallets from 'components/Wallets'
import {FirebaseContext} from 'context/Firebase'
import {Wallet} from 'types'

const Dashboard = () => {
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
    <Container>
      <Wallets
        className={'mt-2'}
        loading={loading}
        wallets={wallets}
      />
      <section
        className={'mt-2'}
      >
        <h2>Overview</h2>
        <p>Chart</p>
      </section>
    </Container>
  )
}

export default withPrivateRouting(Dashboard)
