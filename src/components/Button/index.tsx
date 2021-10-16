import {FC, PropsWithChildren, memo} from 'react'
import {ButtonContent, ButtonWrapper, ButtonProps} from './styled'

const Button: FC<ButtonProps> = (props: PropsWithChildren<ButtonProps>) => {
  const {className, children, ...attrs} = props

  return (
    <ButtonWrapper {...attrs} className={className}>
      <ButtonContent>
        {children}
      </ButtonContent>
    </ButtonWrapper>
  )
}

export default memo(Button)
