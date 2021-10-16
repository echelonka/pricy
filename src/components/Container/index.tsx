import {ComponentPropsWithoutRef, FC, PropsWithChildren} from 'react'
import {StyledContainer} from './styled'

type Props = ComponentPropsWithoutRef<'div'>

const Container: FC<Props> = (props: PropsWithChildren<Props>) => {
  const {children, className, ...attrs} = props

  return <StyledContainer {...attrs} className={className}>{children}</StyledContainer>
}

export default Container
