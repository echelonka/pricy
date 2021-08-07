import React, { PropsWithoutRef } from 'react'
import styled from 'styled-components'

type NewProps = React.ComponentPropsWithoutRef<'div'>

const Card: React.FC<NewProps> = (props: PropsWithoutRef<NewProps>) => {
  const {children, className, ...attrs} = props

  return (
    <StyledCard {...attrs} className={className}>{children}</StyledCard>
  )
}

const StyledCard = styled.div<NewProps>`
  padding: 1.875rem;
  border-radius: 1.5rem;
  position: relative;
`

export default Card
