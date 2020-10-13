import React from 'react'
import withPrivateRouting from 'HOCs/withPrivateRouting'
import Container from 'components/Container'

const Dashboard = () => {
  return (
    <Container>
      <h2>Wallets</h2>
      <p>Wallets</p>
      <h2>Overview</h2>
      <p>Chart</p>
    </Container>
  )
}

export default withPrivateRouting(Dashboard)
