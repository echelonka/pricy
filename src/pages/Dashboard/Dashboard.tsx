import React from 'react'
import withPrivateRouting from 'HOCs/withPrivateRouting'
import Container from 'components/Container'
import Wallets from 'components/Wallets'

const Dashboard = () => {
  return (
    <Container>
      <Wallets/>
      <h2>Overview</h2>
      <p>Chart</p>
    </Container>
  )
}

export default withPrivateRouting(Dashboard)
