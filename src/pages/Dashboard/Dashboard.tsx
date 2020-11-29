import React, {useContext, useEffect, useState} from 'react'
import withPrivateRouting from 'HOCs/withPrivateRouting'
import {ExchangerateContext} from 'context/Exchangerate'
import Container from 'components/Container'
import Wallets from 'components/Wallets'
import Overview from 'components/Overview'
import {FirebaseContext} from 'context/Firebase'
import {Wallet} from 'types'
import Exchangerate from 'api/Exchangerate'

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
    <ExchangerateContext.Provider value={new Exchangerate()}>
      <Container>
        <Wallets
          className={'mt-2'}
          loading={loading}
          wallets={wallets}
        />
        <Overview
          className={'mt-4'}
          loading={loading}
          wallets={wallets}
        />
      </Container>
    </ExchangerateContext.Provider>
  )
}

export default withPrivateRouting(Dashboard)
