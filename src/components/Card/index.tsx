import {FC, ComponentPropsWithoutRef, PropsWithChildren} from 'react'
import {StyledCard} from './styled'

type Props = ComponentPropsWithoutRef<'div'>

const Card: FC<Props>= (props: PropsWithChildren<Props>) => {
  const {children, className, ...attrs} = props

  return (
    <StyledCard {...attrs} className={className}>{children}</StyledCard>
  )
}

export default Card
