import React from 'react'
import classname from 'classnames'
import styled from 'styled-components'

type NewProps = React.ComponentPropsWithoutRef<'div'>

const Card = (props: NewProps) => {
  const {children, className, ...attrs} = props
  const classNames = classname(
    className,
  )

  return (
    <StyledCard {...attrs} className={classNames}>{children}</StyledCard>
  )
}

const StyledCard = styled.div<NewProps>`
  padding: 1.875rem;
  border-radius: 1.5rem;
  position: relative;
`

export default Card
