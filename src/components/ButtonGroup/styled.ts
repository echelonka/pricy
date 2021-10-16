import styled, { css } from 'styled-components'
import {ButtonWrapper} from '../Button/styled'

export const StyledButtonGroup = styled.div`
  display: inline-block;
  
  ${({ theme }) => css`
    border-radius: ${theme.borderRadius};
    ${theme.neumorphism(theme.background)}
  `}
  
  ${ButtonWrapper} {
    box-shadow: none;
  }
`
StyledButtonGroup.displayName = 'StyledButtonGroup'
