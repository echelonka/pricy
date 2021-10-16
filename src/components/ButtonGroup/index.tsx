import { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react'
import { StyledButtonGroup } from './styled'

type Props = ComponentPropsWithoutRef<'div'>

const ButtonGroup: FC<Props> = (props: PropsWithChildren<Props>) => {
  const { className, children, ...attrs } = props

  return (
    <StyledButtonGroup {...attrs} className={className}>
      {children}
    </StyledButtonGroup>
  )
}

export default ButtonGroup
