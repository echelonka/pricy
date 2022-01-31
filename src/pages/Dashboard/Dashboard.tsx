import {useEffect, useState} from 'react'
import {onSnapshot} from 'firebase/firestore'

import withPrivateRouting from 'HOCs/withPrivateRouting'
import {ExchangerateContext} from 'context/Exchangerate'
import {useFirestore} from 'context/FirestoreProvider'
import Exchangerate from 'api/Exchangerate'
import {Wallet} from 'types'

import Container from 'components/Container'
import Wallets from 'components/Wallets'
import Overview from 'components/Overview'

const Dashboard = () => {
  const firestore = useFirestore()
  const [loading, setLoading] = useState(true)
  const [wallets, setWallets] = useState<Wallet[]>([])

  useEffect(() => {
    const walletsListener = onSnapshot(firestore.walletsCollection, snapshot => {
      setWallets(snapshot.docs.map(wallet => ({
        id: wallet.id,
        ...wallet.data(),
      } as Wallet)))
      setLoading(false)
    })
    return () => walletsListener()
  }, [firestore])

  return (
    <ExchangerateContext.Provider value={new Exchangerate()}>
      <Container>
        <Wallets
          className={'mt-2'}
          loading={loading}
          wallets={wallets}
        />
        <Overview
          className={'mt-5'}
          loading={loading}
          wallets={wallets}
        />
      </Container>
    </ExchangerateContext.Provider>
  )
}

export default withPrivateRouting(Dashboard)
