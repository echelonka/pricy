import React from 'react'
import Exchangerate from 'api/Exchangerate'

export type ExchangerateContextType = Exchangerate | null

const ExchangerateContext = React.createContext<ExchangerateContextType>(null)

export default ExchangerateContext
